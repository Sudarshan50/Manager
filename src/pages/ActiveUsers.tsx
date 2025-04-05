import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Play, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

export default function ActiveUsers() {
  // Mock data for active users
  const [users, setUsers] = useState([
    {
      id: 1,
      userHash: "TUF8X4N2",
      name: "Alex Johnson",
      status: "Active",
      loginTime: "2023-05-15T09:30:00",
    },
    {
      id: 2,
      userHash: "TUFY7M1P",
      name: "Sarah Williams",
      status: "Paused",
      loginTime: "2023-05-15T10:15:00",
    },
    {
      id: 3,
      userHash: "TUFD9R3L",
      name: "Michael Brown",
      status: "Active",
      loginTime: "2023-05-15T11:00:00",
    },
    {
      id: 4,
      userHash: "TUFK2S8B",
      name: "Emily Davis",
      status: "Paused",
      loginTime: "2023-05-15T08:45:00",
    },
    {
      id: 5,
      userHash: "TUFP5T7Q",
      name: "Daniel Wilson",
      status: "Active",
      loginTime: "2023-05-15T12:30:00",
    },
  ]);

  const fetchActiveSession = async () => {
    await axios
      .get("http://localhost:3000/api/admin/active")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          interface User {
            id: number;
            userHash: string;
            name: string;
            status: string;
            loginTime: string;
          }
          const userData = res.data?.data.map((user: User) => ({
            id: user.id,
            userHash: user.userHash,
            name: user.name,
            status: user.status === "active" ? "Active" : "Paused",
            loginTime: user.loginTime,
          }));
          setUsers(userData);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching active sessions. Please try again.");
      });
  };

  // Format login time
  const formatLoginTime = (dateString: string) => {
    const loginTime = new Date(dateString);
    const currentTime = new Date();

    if (isNaN(loginTime.getTime())) {
      return "Invalid Date";
    }

    const diffInMs = currentTime.getTime() - loginTime.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const seconds = diffInSeconds % 60;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const minutes = diffInMinutes % 60;
    const hours = Math.floor(diffInMinutes / 60);

    if (hours < 24) {
      return `${hours.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:${minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:${seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })} ago`;
    }

    const diffInDays = Math.floor(hours / 24);
    return `${diffInDays} day(s) ago`;
  };

  // Mask user hash to only show first 3 and last 2 characters
  const maskUserHash = (hash: string) => {
    return hash.substring(0, 3) + "****" + hash.substring(hash.length - 2);
  };

  // Handle resume user
  const handleResume = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "Active" } : user
      )
    );

    const user = users.find((u) => u.id === userId);
    if (user) {
      toast.success(`Resumed session for ${user.name}`);
    }
  };

  // Handle revoke user
  const handleRevoke = async (userId: string) => {
    await axios
      .post("http://localhost:3000/api/admin/revoke", {
        userHash: userId,
      })
      .then((res) => {
        if (res.status === 200) {
          setUsers(users.filter((user) => user.userHash !== userId));
          toast.success(`Revoked session for ${userId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error revoking session. Please try again.");
      });
  };
  useEffect(() => {
    fetchActiveSession();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Active Users</h1>
        <p className="text-muted-foreground">
          Manage currently active and paused user sessions
        </p>
      </div>

      {users.length > 0 ? (
        <div className="gaming-card overflow-hidden overflow-x-auto">
          <Table className="gaming-table w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">S.No</TableHead>
                <TableHead>User Hash</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Login Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono">
                    {maskUserHash(user.userHash)}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatLoginTime(user.loginTime)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {user.status === "Paused" && (
                        <button
                          onClick={() => handleResume(user.id)}
                          className="gaming-btn-success py-1 px-2 text-xs"
                        >
                          <Play size={14} className="mr-1 inline" />
                          Resume
                        </button>
                      )}
                      <button
                        onClick={() => handleRevoke(user?.userHash)}
                        className="gaming-btn-danger py-1 px-2 text-xs"
                      >
                        <Trash2 size={14} className="mr-1 inline" />
                        Revoke
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 gaming-card">
          <p className="text-muted-foreground">No active users at the moment</p>
        </div>
      )}
    </motion.div>
  );
}
