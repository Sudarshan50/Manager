
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  
  const userHash = generateUserHash();
  
  function generateUserHash() {
    // Generate a random user hash
    const hashChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let hash = "";
    for (let i = 0; i < 8; i++) {
      hash += hashChars.charAt(Math.floor(Math.random() * hashChars.length));
    }
    return hash;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    // Mock submission (would connect to backend in real implementation)
    toast.success(`User ${formData.name} added successfully`);
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New User</h1>
        <p className="text-muted-foreground">Register a new user to the TUF Esports Lounge system</p>
      </div>
      
      <div className="gaming-card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="gaming-input w-full"
                placeholder="Enter user's full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="gaming-input w-full"
                placeholder="Enter 10-digit phone number"
                required
                pattern="[0-9]{10}"
              />
            </div>
            
            <div>
              <label htmlFor="userHash" className="block text-sm font-medium mb-1">
                User Hash
              </label>
              <input
                id="userHash"
                type="text"
                value={userHash}
                className="gaming-input w-full bg-gaming-darker/50 cursor-not-allowed"
                readOnly
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-generated unique identifier for this user
              </p>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="gaming-btn-primary"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
