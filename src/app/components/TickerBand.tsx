import { motion } from 'motion/react';

export function TickerBand() {
  const items = [
    'LANDINGS',
    'GOOGLE ADS',
    'UI/UX',
    'CRM',
    'INTEGRATIONS',
    'WORDPRESS',
    'VUE',
    'PERF-FIRST',
    'CLEAN CODE',
    'ANIMATIONS'
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items, ...items];
  const scrollAmount = items.length * 200; // Approximate scroll distance

  return (
    <div className="py-6 md:py-8 overflow-hidden border-y border-border">
      <motion.div
        className="flex gap-6 md:gap-8 whitespace-nowrap"
        animate={{
          x: [0, -scrollAmount],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Render items multiple times for seamless loop */}
        {allItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 md:gap-8">
            <span className="text-lg md:text-2xl font-black tracking-tight text-muted-foreground/30" style={{ fontFamily: 'var(--font-display)' }}>
              {item}
            </span>
            <span className="text-muted-foreground text-sm md:text-base">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}