import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';

export function SkillsSection() {
  const skills = [
    {
      category: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['Bootstrap', 'BEM', 'jQuery', 'Vue.js']
    },
    {
      category: 'CMS & Backend',
      items: ['WordPress', 'Laravel (pet projects)', 'PHP']
    },
    {
      category: 'Tools & Integration',
      items: ['Google Analytics', 'CRM Systems', 'API Integration']
    },
    {
      category: 'Design & UX',
      items: ['Responsive Design', 'Mobile First', 'Accessibility']
    },
    {
      category: 'Optimization',
      items: ['Performance', 'SEO', 'Core Web Vitals']
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6 font-semibold inline-block">
            <span
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Стек и инструменты
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight" 
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, var(--foreground) 0%, var(--accent-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ТЕХНОЛОГИИ
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="p-5 md:p-6 h-full">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-3 py-1.5 rounded-full text-sm bg-card border border-border text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}