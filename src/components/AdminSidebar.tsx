import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronLeft,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCollapse: () => void;
  onMobileClose: () => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const AdminSidebar = ({ 
  isCollapsed, 
  isMobileOpen,
  onCollapse,
  onMobileClose,
  activeSection = "dashboard",
  onSectionChange
}: AdminSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users, badge: "Admin" },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    onSectionChange?.(itemId);
    onMobileClose(); // Close mobile menu on item click
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "80px" : "240px",
          x: isMobileOpen ? 0 : "-100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-card border-r border-border z-50",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Collapse Button - Desktop Only */}
          <div className="hidden lg:flex justify-end p-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              className="h-8 w-8"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Close Button - Mobile Only */}
          <div className="flex lg:hidden justify-between items-center p-4 border-b">
            <span className="font-semibold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed && "justify-center px-2"
                  )}
                  onClick={() => handleItemClick(item.id)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            {!isCollapsed && (
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Admin Panel</p>
                <p>v1.0.0</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
