import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Send, Mail } from 'lucide-react';
import { PortfolioButton } from './PortfolioButton';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export function MobileMenu({ isOpen, onClose, theme }: MobileMenuProps) {
  const menuItems = [
    { label: 'Работы', id: 'works' },
    { label: 'Процесс', id: 'process' },
    { label: 'Навыки', id: 'skills' },
    { label: 'Обо мне', id: 'about' },
    { label: 'Контакты', id: 'contacts' },
  ];

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    // Store scroll position
    const scrollY = parseInt(document.body.style.top || '0') * -1;
    
    // Close menu first - restore scroll
    onClose();
    
    // Wait for menu close animation, then scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToContacts = () => {
    scrollToSection('contacts');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 bg-background border-l border-border shadow-2xl"
          >
            <div className="flex flex-col h-full p-8" style={{ 
              paddingTop: 'max(2rem, env(safe-area-inset-top))',
              paddingBottom: 'max(2rem, env(safe-area-inset-bottom))'
            }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div 
                  className="text-2xl font-black tracking-tight text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  МЕНЮ
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-muted hover:bg-secondary text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left py-4 px-6 rounded-2xl text-2xl font-bold tracking-tight transition-all relative overflow-hidden group text-muted-foreground hover:text-foreground hover:bg-muted"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-muted/50"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{item.label}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <PortfolioButton 
                  variant="primary" 
                  className="w-full justify-center py-4 text-base"
                  onClick={scrollToContacts}
                >
                  <Mail className="w-5 h-5" />
                  Написать мне
                </PortfolioButton>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://github.com/askhalilov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://t.me/Shiiisui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}