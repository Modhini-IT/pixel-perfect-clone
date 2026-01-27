import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Moon, Shield, Globe, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import heroBg from "@/assets/hero-bg.jpg";

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: <Bell className="w-5 h-5" />, label: "Notifications", description: "Enable push notifications", defaultChecked: true },
    { icon: <Moon className="w-5 h-5" />, label: "Dark Mode", description: "Use dark theme", defaultChecked: true },
    { icon: <Shield className="w-5 h-5" />, label: "Privacy Mode", description: "Hide your activity status", defaultChecked: false },
    { icon: <Globe className="w-5 h-5" />, label: "Location Services", description: "Allow location tracking", defaultChecked: true },
    { icon: <Smartphone className="w-5 h-5" />, label: "Mobile Alerts", description: "Receive SMS alerts", defaultChecked: false },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
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
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]">Settings</span>
          </h1>
        </motion.div>

        {/* Settings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="space-y-2">
              {settingsItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={item.defaultChecked} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Settings;
