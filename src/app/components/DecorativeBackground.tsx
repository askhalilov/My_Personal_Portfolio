import { motion } from 'motion/react';

export function DecorativeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top right corner lines */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-0 right-0 w-96 h-96"
      >
        <div 
          className="absolute top-20 right-20 w-40 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--accent-blue) 50%, transparent 100%)',
          }}
        />
        <div 
          className="absolute top-32 right-10 w-60 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--accent-purple) 50%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Bottom left corner geometric shapes */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-0 left-0 w-96 h-96"
      >
        <div 
          className="absolute bottom-40 left-20 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-20 left-40 w-px h-32"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, var(--accent-blue) 50%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Center floating circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div 
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--accent-blue), transparent 60%)',
          }}
        />
      </motion.div>

      {/* Animated grid lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
