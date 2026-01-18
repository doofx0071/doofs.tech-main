import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/hooks/use-theme';
import logoLight from '@/assets/doofs-logo-light.svg';
import logoDark from '@/assets/doofs-logo-dark.svg';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Menu } from "lucide-react";

interface AdminHeaderProps {
  currentUser: any;
  onMenuClick: () => void;
}

const AdminHeader = ({ currentUser, onMenuClick }: AdminHeaderProps) => {
  const { theme } = useTheme();
  const { signOut } = useAuthActions();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-full mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Left Side - Menu Button (Mobile) + Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <a href="/" className="flex items-center gap-1.5 md:gap-2 font-mono font-bold text-base md:text-xl tracking-tight">
            <img
              key={theme}
              src={theme === "dark" ? logoDark : logoLight}
              alt="doofs.tech logo"
              className="h-6 md:h-8 w-auto"
            />
            <span>doofs<span className="text-muted-foreground text-[10px] sm:text-xs">.tech</span></span>
          </a>
        </div>

        {/* Right Side - Theme Toggle + Profile */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser?.image} />
                  <AvatarFallback>
                    {currentUser?.email?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.name || "Admin"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/")}>
                <User className="mr-2 h-4 w-4" />
                <span>View Site</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
