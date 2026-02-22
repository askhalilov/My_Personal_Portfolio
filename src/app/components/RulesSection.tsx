import { motion } from 'motion/react';
import { Smartphone, Zap, Code2, BarChart3, MessageSquare } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function RulesSection() {
  const rules = [
    {
      number: '01',
      title: 'Mobile-first, pixel-perfect',
      description: 'Сначала мобильная версия, потом расширение. Каждый пиксель на своём месте, адаптивность на всех устройствах.',
      icon: Smartphone,
    },
    {
      number: '02',
      title: 'Скорость и доступность',
      description: 'Лёгкие анимации, быстрая загрузка. Performance-first подход, a11y стандарты, оптимизация под Core Web Vitals.',
      icon: Zap,
    },
    {
      number: '03',
      title: 'Чистый код и поддерживаемость',
      description: 'Понятная структура, правильный нейминг, готовность к code-review. Код должен быть понятен другим разработчикам.',
      icon: Code2,
    },
    {
      number: '04',
      title: 'Метрики, тесты, рост',
      description: 'Трафик → конверсия → CRM/аналитика. Тестирование, сбор метрик, постоянная оптимизация результатов.',
      icon: BarChart3,
    },
    {
      number: '05',
      title: 'Коммуникация и сроки',
      description: 'Фиксирую договорённости, довожу до релиза. Прозрачная коммуникация, соблюдение дедлайнов, регулярные обновления.',
      icon: MessageSquare,
    }
  ];

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative">
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
              Принципы работы
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
              МОИ ПРАВИЛА
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4 md:space-y-8">
          {rules.map((rule, idx) => {
            const IconComponent = rule.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <GlassCard className="p-5 md:p-8 lg:p-12 group">
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-card border border-border flex items-center justify-center group-hover:bg-muted transition-all">
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-foreground/80" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 md:gap-4 mb-2 md:mb-3">
                        <span className="text-xs md:text-sm font-black text-muted-foreground/50 flex-shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
                          {rule.number}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground break-words" style={{ fontFamily: 'var(--font-display)' }}>
                          {rule.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}