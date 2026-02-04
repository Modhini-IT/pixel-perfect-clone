import { useRef, useEffect, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import { motion } from "framer-motion";
import { Camera, CameraOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaceDetectionProps {
  onFaceDetected?: (detections: faceapi.FaceDetection[]) => void;
}

const FaceDetection = ({ onFaceDetected }: FaceDetectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faceCount, setFaceCount] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  // Load face-api models
  const loadModels = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      
      setModelsLoaded(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading models:", err);
      setError("Failed to load face detection models. Please refresh and try again.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadModels();
    return () => {
      stopCamera();
    };
  }, [loadModels]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please ensure camera permissions are granted.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setFaceCount(0);
  };

  const detectFaces = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    
    faceapi.matchDimensions(canvas, displaySize);

    const detect = async () => {
      if (!videoRef.current || !canvasRef.current || !isStreaming) return;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw custom styled detections
        resizedDetections.forEach((detection) => {
          const box = detection.detection.box;
          
          // Draw bounding box with glow effect
          ctx.strokeStyle = "hsl(160, 100%, 50%)";
          ctx.lineWidth = 3;
          ctx.shadowColor = "hsl(160, 100%, 50%)";
          ctx.shadowBlur = 15;
          ctx.strokeRect(box.x, box.y, box.width, box.height);
          
          // Draw landmarks
          ctx.shadowBlur = 0;
          const landmarks = detection.landmarks;
          const positions = landmarks.positions;
          
          ctx.fillStyle = "hsl(160, 100%, 50%)";
          positions.forEach((point) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fill();
          });
          
          // Draw dominant expression
          const expressions = detection.expressions;
          const maxExpression = Object.entries(expressions).reduce((a, b) => 
            a[1] > b[1] ? a : b
          );
          
          ctx.font = "14px Inter, sans-serif";
          ctx.fillStyle = "hsl(160, 100%, 50%)";
          ctx.fillText(
            `${maxExpression[0]}: ${Math.round(maxExpression[1] * 100)}%`,
            box.x,
            box.y - 10
          );
        });
      }

      setFaceCount(detections.length);
      
      if (onFaceDetected && detections.length > 0) {
        onFaceDetected(detections.map(d => d.detection));
      }

      animationRef.current = requestAnimationFrame(detect);
    };

    detect();
  }, [isStreaming, onFaceDetected]);

  useEffect(() => {
    if (isStreaming && modelsLoaded) {
      const video = videoRef.current;
      if (video) {
        video.onloadedmetadata = () => {
          detectFaces();
        };
      }
    }
  }, [isStreaming, modelsLoaded, detectFaces]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass rounded-3xl p-6 border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Face Detection</h2>
              <p className="text-sm text-muted-foreground">
                Real-time AI-powered face detection
              </p>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {isLoading ? (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading models...
              </span>
            ) : faceCount > 0 ? (
              <span className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="w-4 h-4" />
                {faceCount} face{faceCount > 1 ? "s" : ""} detected
              </span>
            ) : isStreaming ? (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                No faces detected
              </span>
            ) : null}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Video container */}
        <div className="relative aspect-video bg-black/50 rounded-2xl overflow-hidden mb-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Overlay when not streaming */}
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="text-center">
                <CameraOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isLoading ? "Loading face detection models..." : "Camera is off"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isStreaming ? (
            <Button
              onClick={startCamera}
              disabled={isLoading}
              variant="hero"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Start Camera
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={stopCamera}
              variant="destructive"
              size="lg"
            >
              <CameraOff className="w-5 h-5" />
              Stop Camera
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-primary">{faceCount}</p>
            <p className="text-xs text-muted-foreground">Faces</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold">{modelsLoaded ? "Active" : "—"}</p>
            <p className="text-xs text-muted-foreground">AI Status</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold">{isStreaming ? "Live" : "Off"}</p>
            <p className="text-xs text-muted-foreground">Camera</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FaceDetection;
