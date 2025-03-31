
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Trash2, Plus, X } from "lucide-react";

export default function RechargePlans() {
  // State for recharge form
  const [rechargeForm, setRechargeForm] = useState({
    userId: "",
    plan: "",
  });
  
  // State for plans list
  const [plans, setPlans] = useState([
    {
      id: 1,
      totalHours: 10,
      validity: "7 days",
    },
    {
      id: 2,
      totalHours: 20,
      validity: "15 days",
    },
    {
      id: 3,
      totalHours: 50,
      validity: "30 days",
    },
  ]);
  
  // State for add plan modal
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    totalHours: "",
    validity: "",
  });
  
  // Handle recharge form change
  const handleRechargeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRechargeForm({
      ...rechargeForm,
      [name]: value,
    });
  };
  
  // Handle recharge form submit
  const handleRechargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rechargeForm.userId || !rechargeForm.plan) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success(`User ${rechargeForm.userId} recharged successfully`);
    
    setRechargeForm({
      userId: "",
      plan: "",
    });
  };
  
  // Handle delete plan
  const handleDeletePlan = (planId: number) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
    toast.success("Plan deleted successfully");
  };
  
  // Handle new plan change
  const handleNewPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlan({
      ...newPlan,
      [name]: value,
    });
  };
  
  // Handle add plan submit
  const handleAddPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPlan.totalHours || !newPlan.validity) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newPlanObj = {
      id: plans.length + 1,
      totalHours: parseInt(newPlan.totalHours),
      validity: newPlan.validity,
    };
    
    setPlans([...plans, newPlanObj]);
    setNewPlan({ totalHours: "", validity: "" });
    setShowAddPlan(false);
    
    toast.success("New plan added successfully");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recharge & Plans</h1>
        <p className="text-muted-foreground">Manage recharge options and available plans</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recharge Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="gaming-card">
            <h2 className="text-xl font-semibold mb-6">Recharge User</h2>
            
            <form onSubmit={handleRechargeSubmit} className="space-y-6">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium mb-1">
                  User ID
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  value={rechargeForm.userId}
                  onChange={handleRechargeChange}
                  className="gaming-input w-full"
                  placeholder="Enter user ID or scan card"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="plan" className="block text-sm font-medium mb-1">
                  Select Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={rechargeForm.plan}
                  onChange={handleRechargeChange}
                  className="gaming-input w-full"
                  required
                >
                  <option value="">Select a plan</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.totalHours} hours - {plan.validity}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="gaming-btn-primary w-full"
                >
                  Recharge Now
                </button>
              </div>
            </form>
          </div>
        </motion.div>
        
        {/* Plans Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="gaming-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Plans</h2>
              <button
                className="gaming-btn-outline py-1 px-3 text-sm"
                onClick={() => setShowAddPlan(true)}
              >
                <Plus size={16} className="mr-1 inline" /> Add Plan
              </button>
            </div>
            
            {plans.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="gaming-table w-full">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Total Hours</th>
                      <th>Validity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={plan.id}>
                        <td>{index + 1}</td>
                        <td>{plan.totalHours} hours</td>
                        <td>{plan.validity}</td>
                        <td>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No plans available. Add your first plan.
              </p>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Add Plan Modal */}
      {showAddPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gaming-card w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Plan</h2>
              <button
                onClick={() => setShowAddPlan(false)}
                className="text-muted-foreground hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPlanSubmit} className="space-y-6">
              <div>
                <label htmlFor="totalHours" className="block text-sm font-medium mb-1">
                  Total Hours
                </label>
                <input
                  id="totalHours"
                  name="totalHours"
                  type="number"
                  min="1"
                  value={newPlan.totalHours}
                  onChange={handleNewPlanChange}
                  className="gaming-input w-full"
                  placeholder="Enter total hours"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="validity" className="block text-sm font-medium mb-1">
                  Validity
                </label>
                <input
                  id="validity"
                  name="validity"
                  type="text"
                  value={newPlan.validity}
                  onChange={handleNewPlanChange}
                  className="gaming-input w-full"
                  placeholder="E.g. 30 days, 2 weeks"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPlan(false)}
                  className="gaming-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gaming-btn-primary"
                >
                  Add Plan
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
