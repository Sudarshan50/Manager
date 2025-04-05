import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Dashboard() {
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState({
    totalUsers: 0,
    currentDayBalance: 0,
    totalRevenue: 0,
  });

  const getDashContent = async () => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_API_URL}/admin/dashboard`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data?.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch dashboard data");
      }).finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    getDashContent();
  }, []);

if(loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Spinner />
    </div>
  );
}


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
          Managing your gaming center has never been this sleek. Navigate
          through the sidebar to access all features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Unique Users"
            value={data?.totalUsers || "0"}
            description="Today's gaming"
            delay={0.4}
          />
          <StatCard
            title="Today's Hours"
            value={(data?.currentDayBalance)?.toFixed(2) || "0"}
            description="Hours of gameplay"
            delay={0.5}
          />
          <StatCard
            title="Total Revenue"
            value="$"
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
