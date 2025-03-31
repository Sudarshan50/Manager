
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-gaming-accent to-neon-purple bg-clip-text text-transparent animate-gradient-flow">
          TUF Esports Lounge
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          Managing your gaming center has never been this sleek. Navigate through the sidebar to access all features.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Active Users" 
            value="12" 
            description="Currently gaming" 
            delay={0.4} 
          />
          <StatCard 
            title="Today's Hours" 
            value="87.5" 
            description="Hours of gameplay" 
            delay={0.5} 
          />
          <StatCard 
            title="Total Revenue" 
            value="$1,245" 
            description="This month" 
            delay={0.6} 
          />
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="gaming-card flex flex-col items-center justify-center p-6"
    >
      <h3 className="text-muted-foreground font-medium mb-2">{title}</h3>
      <p className="text-4xl font-bold text-gaming-accent mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
