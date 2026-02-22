import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full transition-all flex items-center px-1 border border-border bg-card hover:bg-muted"
      aria-label="Toggle theme"
    >
      {/* Switch track */}
      <div
        className={`absolute w-5 h-5 rounded-full transition-all duration-300 bg-primary ${
          theme === 'light' 
            ? 'translate-x-7' 
            : 'translate-x-0'
        }`}
      />
      
      {/* Icons */}
      <div className="relative flex items-center justify-between w-full px-0.5 pointer-events-none">
        <Moon className={`w-3.5 h-3.5 transition-colors ${
          theme === 'dark' 
            ? 'text-primary-foreground' 
            : 'text-muted-foreground'
        }`} />
        <Sun className={`w-3.5 h-3.5 transition-colors ${
          theme === 'light' 
            ? 'text-primary-foreground' 
            : 'text-muted-foreground'
        }`} />
      </div>
    </button>
  );
}