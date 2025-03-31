
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AllCards() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      userHash: "TUF8X4N2",
      name: "Alex Johnson",
      mobileNo: "9876543210",
      balance: 250,
      status: "Active",
    },
    {
      id: 2,
      userHash: "TUFY7M1P",
      name: "Sarah Williams",
      mobileNo: "8765432109",
      balance: 100,
      status: "Inactive",
    },
    {
      id: 3,
      userHash: "New User",
      mobileNo: "Not Registered",
      balance: 0,
      status: "New",
      generatedHash: "TUF6R8K9", // Pre-generated hash for new user
    },
  ]);
  
  // Partially mask user hash
  const maskUserHash = (hash: string) => {
    if (hash === "New User") return hash;
    return hash.substring(0, 3) + "****" + hash.substring(7);
  };
  
  // Format balance as currency
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(balance);
  };
  
  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    
    // For a new user, also check the generated hash
    const hashToSearch = user.status === "New" ? user.generatedHash : user.userHash;
    
    return (
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.mobileNo && user.mobileNo.toLowerCase().includes(query)) ||
      (hashToSearch && hashToSearch.toLowerCase().includes(query))
    );
  });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Cards</h1>
        <p className="text-muted-foreground">Manage all registered and new user cards</p>
      </div>
      
      {/* Search input */}
      <div className="mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search by name, mobile number or user hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 gaming-card border-gaming-accent/30 focus:border-gaming-accent/70"
          />
        </div>
      </div>
      
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="gaming-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">User Hash</p>
                  <p className="font-mono font-medium">
                    {user.status === "New" ? user.generatedHash : maskUserHash(user.userHash)}
                  </p>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : user.status === "New"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">{user.name || "Not Registered"}</p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Mobile No</p>
                  <p className="font-medium">{user.mobileNo}</p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="font-bold text-gaming-accent">
                    {user.status === "New" ? "N/A" : formatBalance(user.balance)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                {user.status === "New" ? (
                  <Link to="/add-user" className="gaming-btn-primary w-full flex items-center justify-center">
                    <Plus size={16} className="mr-2" />
                    Register User
                  </Link>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toast.success(`Viewing details for ${user.name || "user"}`)}
                      className="gaming-btn-outline flex-1"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toast.info(`Adding balance for ${user.name || "user"}`)}
                      className="gaming-btn-primary flex-1"
                    >
                      Add Balance
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Add New Card Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              to="/add-user"
              className="gaming-card h-full flex flex-col items-center justify-center min-h-[250px] border-dashed"
            >
              <div className="p-3 rounded-full bg-gaming-accent/10 mb-4">
                <Plus size={24} className="text-gaming-accent" />
              </div>
              <p className="font-medium text-gaming-accent">Add New Card</p>
              <p className="text-xs text-muted-foreground mt-2">
                Register a new user to the system
              </p>
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12 gaming-card">
          <p className="text-muted-foreground">No users found matching your search</p>
        </div>
      )}
    </motion.div>
  );
}
