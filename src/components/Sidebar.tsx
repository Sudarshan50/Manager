
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  UserPlus, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Home,
  Menu,
  X
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/",
  },
  // {
  //   name: "Add User",
  //   icon: UserPlus,
  //   path: "/add-user",
  // },
  {
    name: "Active Users",
    icon: Users,
    path: "/active-users",
  },
  {
    name: "All Cards",
    icon: CreditCard,
    path: "/all-cards",
  },
  {
    name: "Recharge & Plans",
    icon: Receipt,
    path: "/recharge/:",
  },
  {
    name: "Bill Details",
    icon: BarChart3,
    path: "/bill-details",
  },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="lg:hidden fixed top-6 left-6 z-50 p-2 rounded-md bg-gaming-accent/20 hover:bg-gaming-accent/30 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full z-50 bg-gaming-darker w-64 border-r border-border transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:relative lg:z-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-neon-blue via-gaming-accent to-neon-purple bg-clip-text text-transparent animate-gradient-flow">
              TUF Esports Admin
            </h1>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-item",
                  location.pathname === item.path && "active"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} className={location.pathname === item.path ? "text-neon-blue" : "text-muted-foreground"} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} TUF Esports Lounge
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
