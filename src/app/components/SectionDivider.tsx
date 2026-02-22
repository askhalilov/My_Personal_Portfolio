import { motion } from 'motion/react';

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`relative py-12 md:py-16 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="h-px w-full relative"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--accent-blue) 25%, var(--accent-purple) 75%, transparent 100%)',
            opacity: 0.3
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-sm"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--accent-blue) 25%, var(--accent-purple) 75%, transparent 100%)',
              opacity: 0.5
            }}
          />
        </motion.div>
        
        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="w-1 h-1 rounded-full"
              style={{
                background: i === 1 ? 'var(--accent-purple)' : 'var(--border)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
