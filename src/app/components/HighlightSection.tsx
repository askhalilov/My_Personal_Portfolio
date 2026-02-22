import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { ArrowRight } from 'lucide-react';

export function HighlightSection() {
  const highlights = [
    {
      category: 'Google Ads',
      title: 'Юридический лендинг',
      metrics: '3.2% CTR • <2s загрузка',
      gradient: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      category: 'Сайты',
      title: 'Корпоративный сайт',
      metrics: 'Pixel-perfect • Mobile First',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      category: 'CRM',
      title: 'Автоматизация процессов',
      metrics: '-40% времени на рутину',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      category: 'Pet',
      title: 'Laravel приложение',
      description: 'Архитектура • Clean Code',
      gradient: 'from-rose-500/20 to-orange-500/20'
    }
  ];

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="mb-10 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 font-semibold inline-block">
            <span
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Избранное
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight" 
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, var(--foreground) 0%, var(--accent-blue) 50%, var(--accent-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              HIGHLIGHTS
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 h-full group cursor-pointer">
                <div 
                  className="w-full aspect-square rounded-xl mb-4 flex items-center justify-center text-6xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradient})`,
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  <div className="opacity-30">{idx + 1}</div>
                </div>
                
                <div className="text-xs uppercase tracking-wider text-primary mb-2 font-semibold">
                  {item.category}
                </div>
                
                <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors" 
                    style={{ fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {item.metrics}
                </p>

                <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Подробнее</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}