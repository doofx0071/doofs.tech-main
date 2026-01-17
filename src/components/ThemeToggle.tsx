import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-background/50 hover:bg-accent transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <Sun className={`w-4 h-4 absolute transition-all duration-300 ${
        theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
      }`} />
      <Moon className={`w-4 h-4 absolute transition-all duration-300 ${
        theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
      }`} />
    </motion.button>
  );
};

export default ThemeToggle;
