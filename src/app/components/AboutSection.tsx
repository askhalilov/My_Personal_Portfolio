import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';

export function AboutSection() {
  const stats = [
    { value: '16+', label: 'Проектов' },
    { value: '4', label: 'Категории' },
    { value: '24ч', label: 'Быстрый фидбек' }
  ];

  return (
    <section id="about" className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 font-semibold relative inline-block">
              <span 
                className="relative z-10"
                style={{
                  background: 'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Обо мне
              </span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 md:mb-8 relative" 
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--foreground) 0%, var(--accent-blue) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                АСКАР
              </span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--foreground) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ХАЛИЛОВ
              </span>
              
              {/* Decorative accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 w-16 md:w-24 mt-4 md:mt-6 rounded-full"
                style={{
                  background: 'var(--accent-gradient)',
                }}
              />
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Веб-разработчик с фокусом на frontend. Создаю сайты, лендинги и веб-приложения 
                с акцентом на производительность и чистый код.
              </p>
              <p>
                Работал в Gorgona Media над лендингами для Google Ads, разрабатывал корпоративные 
                сайты и внутренние CRM-инструменты. Всегда стремлюсь к pixel-perfect реализации 
                и оптимальной производительности.
              </p>
              <p>
                В свободное время изучаю новые технологии через pet-проекты, сейчас углубляюсь 
                в Laravel и современные архитектурные паттерны.
              </p>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {stats.map((stat, idx) => (
                <GlassCard key={idx} className="p-6 md:p-8" hoverable={false}>
                  <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}