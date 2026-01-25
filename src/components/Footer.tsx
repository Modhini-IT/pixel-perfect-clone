import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              <span className="text-foreground">Eco</span>
              <span className="text-gradient-eco">Track</span>
            </span>
          </div>

          {/* Info */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              Problem Statement ID: PS-03 • Stream: INNOWEL • Category: Software
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              iCUBE 5.0 • Sri Venkateswara College of Engineering
            </p>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Team Ethu Nagarjuna Vaa. Built with 💚 for a greener future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
