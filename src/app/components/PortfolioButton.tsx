import { ReactNode, MouseEventHandler } from 'react';

interface PortfolioButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  href?: string;
}

export function PortfolioButton({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '',
  href
}: PortfolioButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-full font-medium transition-all duration-300 inline-flex items-center gap-2';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-2xl relative overflow-hidden group',
    secondary: 'border border-border bg-card text-foreground hover:bg-muted hover:border-border/70 hover:scale-105 relative overflow-hidden group',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted relative overflow-hidden group'
  };

  const ButtonContent = (
    <>
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle at center, var(--glow-purple), transparent 70%)'
            : 'radial-gradient(circle at center, var(--glow-blue), transparent 70%)',
        }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );
  
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {ButtonContent}
    </Component>
  );
}