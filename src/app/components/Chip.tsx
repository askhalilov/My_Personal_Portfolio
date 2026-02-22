interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Chip({ children, active = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        border cursor-pointer whitespace-nowrap flex-shrink-0 relative overflow-hidden group
        ${active 
          ? 'border-transparent text-white shadow-lg shadow-blue-500/20' 
          : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-border/70'
        }
      `}
      style={{
        background: active ? 'var(--accent-gradient)' : undefined,
      }}
    >
      {/* Glow effect for active state */}
      {active && (
        <div 
          className="absolute inset-0 opacity-50 blur-md pointer-events-none"
          style={{
            background: 'var(--accent-gradient)',
          }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
}