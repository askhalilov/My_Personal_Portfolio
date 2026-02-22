import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { MessageSquare, Lightbulb, Rocket } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Обсуждаем вашу задачу',
      description: 'Погружаюсь в проект, выясняю цели, аудиторию и требования. Фиксирую все детали.',
      icon: MessageSquare
    },
    {
      number: '02',
      title: 'Превращаем её в идею',
      description: 'Разрабатываю концепцию, архитектуру, UI/UX подход. Согласовываем решение.',
      icon: Lightbulb
    },
    {
      number: '03',
      title: 'Создаём продукт',
      description: 'Дизайн → код → тесты. Итерации, обратная связь, релиз. Готовый результат.',
      icon: Rocket
    }
  ];

  return (
    <section id="process" className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative">
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
              Процесс
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight" 
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
              КАК Я РАБОТАЮ
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <GlassCard className="p-6 md:p-8 h-full">
                  <div className="mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-card border border-border flex items-center justify-center mb-4 md:mb-6">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-foreground/80" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs md:text-sm font-black text-muted-foreground/50 mb-3 md:mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                      {step.number}
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2 md:mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}