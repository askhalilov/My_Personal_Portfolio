import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import { PortfolioButton } from './PortfolioButton';
import { GlassCard } from './GlassCard';

export function Hero() {
  const skills = [
    { title: 'Mobile First', description: 'Приоритет мобильной версии' },
    { title: 'Clean Code', description: 'Читаемый и поддерживаемый код' },
    { title: 'Performance', description: 'Оптимизация и скорость' },
    { title: 'Analytics', description: 'Метрики и аналитика' }
  ];

  const scrollToWorks = () => {
    const element = document.getElementById('works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left side - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground mb-4 md:mb-6 font-semibold">
              Веб-разработчик / Frontend • Москва
            </div>
            
            {/* Gradient heading with accent */}
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 md:mb-8 leading-none relative"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span
                className="inline-block"
                style={{ 
                  opacity: 0.9,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, var(--accent-blue) 50%, var(--accent-purple) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ASKAR
              </span>
              <br />
              <span
                className="inline-block"
                style={{ 
                  opacity: 0.9,
                  background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 50%, rgba(255,255,255,0.98) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                KHALILOV
              </span>
              
              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-1 w-20 md:w-32 mt-4 md:mt-6 rounded-full"
                style={{
                  background: 'var(--accent-gradient)',
                }}
              />
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-lg leading-relaxed">
              Живу коддингом и ищу команду, где смогу применять и расширять знания, 
              работая над интересными продуктами.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <PortfolioButton variant="primary" onClick={scrollToWorks} className="w-full sm:w-auto justify-center">
                Смотреть работы
                <ArrowRight className="w-4 h-4" />
              </PortfolioButton>
              <PortfolioButton variant="secondary" onClick={scrollToContacts} className="w-full sm:w-auto justify-center">
                Связаться
                <Mail className="w-4 h-4" />
              </PortfolioButton>
            </div>
          </motion.div>

          {/* Right side - Skills cards */}
          <motion.div
            className="grid grid-cols-2 gap-3 md:gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {skills.map((skill, idx) => (
              <GlassCard key={idx} className="p-4 md:p-6" hoverable={false}>
                <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {skill.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {skill.description}
                </p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}