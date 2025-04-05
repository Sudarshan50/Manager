import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FileText, SortAsc, X } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";
import axios from "axios";

const billLogs = [
  {
    id: 1,
    date: "2023-05-15",
    name: "Alex Johnson",
    totalTime: "2:30",
    hour: 2.5,
  },
  {
    id: 2,
    date: "2023-05-15",
    name: "Sarah Williams",
    totalTime: "1:45",
    hour: 1.75,
  },
  {
    id: 3,
    date: "2023-05-14",
    name: "Michael Brown",
    totalTime: "3:15",
    hour: 3.25,
  },
  {
    id: 4,
    date: "2023-05-14",
    name: "Emily Davis",
    totalTime: "4:00",
    hour: 4,
  },
  {
    id: 5,
    date: "2023-05-13",
    name: "Daniel Wilson",
    totalTime: "2:00",
    hour: 2,
  },
  {
    id: 6,
    date: "2023-05-13",
    name: "Olivia Martin",
    totalTime: "1:30",
    hour: 1.5,
  },
  {
    id: 7,
    date: "2023-05-12",
    name: "James Taylor",
    totalTime: "5:00",
    hour: 5,
  },
];

export default function BillDetails() {
  const [dayUsers, setDayUsers] = useState(0);
  const [dayHours, setDayHours] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [monthlyHours, setMonthlyHours] = useState(0);
  const [billLogs, setBillLogs] = useState([]);

  // State for bill details
  const [showStatement, setShowStatement] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/dashboard`
      );
      if (res.status === 200) {
        console.log("Dashboard data fetched successfully:", res.data);
        const { currentDayBalance, monthlyBalance, totalUsers, weeklyBalance } =
          res.data?.data;
        setDayUsers(totalUsers);
        setDayHours(currentDayBalance.toFixed(2));
        setWeeklyHours(weeklyBalance.toFixed(2));
        setMonthlyHours(monthlyBalance.toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  const billLogfetch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/bills`
      );
      if (res.status === 200) {
        const billData = res.data?.data.map((log: any) => ({
          date: log?.date,
          name: log.userName,
          totalTime: `${log?.loginTime} - ${log?.logOutTime}`,
          hour: log.billAmount,
        }));
        billData.sort((a: any, b: any) => {
          const dateComparison =
            new Date(b.date).getTime() - new Date(a.date).getTime();
          if (dateComparison === 0) {
            return b.totalTime.localeCompare(a.totalTime);
          }
          return dateComparison;
        });
        setBillLogs(billData);
      }
    } catch (error) {
      console.error("Error fetching bill logs:", error);
      toast.error("Failed to fetch bill logs");
    }
  };

  useEffect(() => {
    Promise.all([fetchDashboardData(), billLogfetch()]);
  }, []);

  // Handle generate statement
  const handleGenerateStatement = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (endDate < startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    toast.success("Statement generated successfully");
    setShowStatement(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bill Details</h1>
            <p className="text-muted-foreground">
              Track usage statistics and generate statements
            </p>
          </div>

          <button
            onClick={() => setShowStatement(true)}
            className="gaming-btn-outline"
          >
            <FileText size={18} className="mr-2" />
            Generate Statement
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Day Users"
          value={dayUsers}
          description="Total users today"
          delay={0.1}
        />
        <SummaryCard
          title="Curr. Day Hours"
          value={dayHours}
          description="Hours used today"
          delay={0.2}
        />
        <SummaryCard
          title="Weekly Hours"
          value={weeklyHours}
          description="Hours used this week"
          delay={0.3}
        />
        <SummaryCard
          title="Monthly Hours"
          value={monthlyHours}
          description="Hours used this month"
          delay={0.4}
        />
      </div>

      {/* Bill Logs */}
      <div className="gaming-card overflow-hidden">
        <h2 className="text-xl font-semibold mb-6">Usage Log</h2>

        <div className="overflow-x-auto">
          <table className="gaming-table w-full">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Name</th>
                <th>Login - Logout</th>
                <th>Hour</th>
              </tr>
            </thead>
            <tbody>
              {billLogs.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>{log.name}</td>
                  <td>{log.totalTime}</td>
                  <td>{log.hour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statement Modal */}
      {showStatement && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gaming-card w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Generate Statement</h2>
              <button
                onClick={() => setShowStatement(false)}
                className="text-muted-foreground hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateStatement();
              }}
              className="space-y-6"
            >
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                label="Start Date"
              />

              <DatePicker
                date={endDate}
                setDate={setEndDate}
                label="End Date"
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowStatement(false)}
                  className="gaming-btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="gaming-btn-primary">
                  Download
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function SummaryCard({ title, value, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="gaming-card flex flex-col p-6"
    >
      <h3 className="text-muted-foreground font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gaming-accent mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
