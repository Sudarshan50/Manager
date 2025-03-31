
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-dark">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-gaming-accent bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This page doesn't exist in the gaming universe</p>
        <Link to="/" className="gaming-btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Return to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
