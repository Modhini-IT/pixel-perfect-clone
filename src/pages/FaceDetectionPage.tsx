import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Scan, Shield, Zap } from "lucide-react";
import FaceDetection from "@/components/FaceDetection";
import heroBg from "@/assets/hero-bg.jpg";

const FaceDetectionPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen relative overflow-hidden pb-24">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <Scan className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Face Detection
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-6 border border-white/10">
            <Zap className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Real-time Detection</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered face detection running locally in your browser
            </p>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <Shield className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens on your device, no data leaves your browser
            </p>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <Scan className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Expression Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Detects facial landmarks and analyzes expressions in real-time
            </p>
          </div>
        </motion.div>

        {/* Face Detection Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaceDetection />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Powered by face-api.js • TensorFlow.js
        </motion.p>
      </div>
    </section>
  );
};

export default FaceDetectionPage;
