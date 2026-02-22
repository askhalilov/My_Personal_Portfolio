import { useState, useEffect } from 'react';
import { Mail, Github, Send, Menu } from 'lucide-react';
import { PortfolioButton } from './PortfolioButton';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${scrolled 
          ? 'bg-background/60 backdrop-blur-xl border-b border-border' 
          : ''
        }
      `}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-xl font-black tracking-tight cursor-pointer transition-colors text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ASKAR
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('works')}
              className="text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              Работы
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              Обо мне
            </button>
            <button 
              onClick={() => scrollToSection('contacts')}
              className="text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              Контакты
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href="https://github.com/askhalilov"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/Shiiisui"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block transition-colors text-muted-foreground hover:text-foreground"
            >
              <Send className="w-5 h-5" />
            </a>
            <PortfolioButton 
              variant="primary" 
              className="hidden md:inline-flex text-sm py-3 px-6"
              onClick={() => scrollToSection('contacts')}
            >
              Написать
            </PortfolioButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all bg-muted hover:bg-secondary text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        theme={theme}
      />
    </nav>
  );
}