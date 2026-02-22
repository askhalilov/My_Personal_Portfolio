import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Phone, Github } from 'lucide-react';
import { PortfolioButton } from './PortfolioButton';

export function ContactsSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for environments where Clipboard API is unavailable
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        return ok;
      } catch {
        return false;
      }
    }
  };

  const handleCopy = async (text: string, message: string) => {
    const ok = await copyToClipboard(text);
    showToast(ok ? message : 'Не удалось скопировать');
  };

  return (
    <section id="contacts" className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
   
          
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-tight relative" 
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="block"
              style={{
                background: 'linear-gradient(135deg, var(--foreground) 0%, var(--accent-blue) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ДАВАЙТЕ
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="block"
              style={{
                background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ОБСУДИМ
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="block"
              style={{
                background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--foreground) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ПРОЕКТ
            </motion.span>
          </h2>
          
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed px-4">
            Откликнусь быстро. Можно писать в Telegram или на почту.
          </p>

          {/* Contact buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
            <PortfolioButton
              variant="primary"
              href="#"
              className="w-full sm:w-auto justify-center"
              onClick={(e) => {
                e.preventDefault();
                handleCopy('luntickov89@gmail.com', 'Адрес электронной почты скопирован');
              }}
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              Email
            </PortfolioButton>
            <PortfolioButton variant="secondary" href="https://t.me/Shiiisui" className="w-full sm:w-auto justify-center">
              <Send className="w-4 h-4 md:w-5 md:h-5" />
              Telegram
            </PortfolioButton>
            <PortfolioButton 
              variant="secondary" 
              href="#" 
              className="w-full sm:w-auto justify-center" 
              onClick={(e) => {
                e.preventDefault();
                handleCopy('+79174476510', 'Номер телефона скопирован');
              }}
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Телефон
            </PortfolioButton>
            <PortfolioButton variant="secondary" href="https://github.com/askhalilov" className="w-full sm:w-auto justify-center">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              GitHub
            </PortfolioButton>
          </div>

          {/* Footer note */}
          <div className="text-xs md:text-sm text-muted-foreground flex flex-wrap justify-center gap-2 md:gap-3">
            <span>15-мин созвон</span>
            <span className="hidden sm:inline">•</span>
            <span>оценка сроков за 24ч</span>
            <span className="hidden sm:inline">•</span>
            <span>perf-first</span>
          </div>
        </motion.div>
      </div>

      {/* Copy toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="copy-toast"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[9999] px-4 py-3 rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md text-sm text-foreground shadow-2xl"
            role="status"
            aria-live="polite"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}