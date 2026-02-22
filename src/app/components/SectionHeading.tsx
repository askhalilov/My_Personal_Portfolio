import { motion } from 'motion/react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ 
  label, 
  title, 
  subtitle, 
  align = 'left' 
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {label && (
        <div className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
          {label}
        </div>
      )}
      <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl" style={{ fontFamily: 'var(--font-body)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
