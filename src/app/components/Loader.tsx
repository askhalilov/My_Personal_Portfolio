import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['CREATIVE', 'WEB', 'DEVELOPER'];

  // Loader chime (plays once while the loader is on screen).
  // Note: autoplay audio may be blocked on some mobile browsers.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const doneRef = useRef(false);
  const gestureHandlerRef = useRef<((e?: any) => void) | null>(null);

  const removeGestureHandlers = () => {
    const h = gestureHandlerRef.current;
    if (!h) return;
    window.removeEventListener('pointerdown', h);
    window.removeEventListener('touchstart', h);
    window.removeEventListener('keydown', h);
    gestureHandlerRef.current = null;
  };

  useEffect(() => {
    const a = new Audio(`${import.meta.env.BASE_URL}assets/sfx/loader-chime.mp3`);
    a.preload = 'auto';
    a.volume = 1;
    audioRef.current = a;

    // Cleanup
    return () => {
      removeGestureHandlers();
      try {
        a.pause();
        a.currentTime = 0;
      } catch {}
    };
  }, []);

  const playChime = async () => {
    const a = audioRef.current;
    if (!a) return;

    const tryStart = async () => {
      try {
        a.currentTime = 0;
        // Ensure mobile-friendly playback
        (a as any).playsInline = true;
        a.muted = false;
        await a.play();
      } catch {
        // Autoplay blocked — try again on the first gesture while the loader is visible.
        if (gestureHandlerRef.current) return;

        const onGesture = async () => {
          removeGestureHandlers();
          try {
            a.currentTime = 0;
            (a as any).playsInline = true;
            a.muted = false;
            await a.play();
          } catch {}
        };

        gestureHandlerRef.current = onGesture;
        window.addEventListener('pointerdown', onGesture, { passive: true });
        window.addEventListener('touchstart', onGesture, { passive: true });
        window.addEventListener('keydown', onGesture);
      }
    };

    await tryStart();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!doneRef.current) {
            doneRef.current = true;
            // Play a short hi-tech sound while the loader is still visible.
            playChime();
            // The provided sound is ~1.23s long.
            setTimeout(onComplete, 1250);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 800);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          {/* Animated words */}
          <div className="h-32 flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentWord}
                className="text-6xl md:text-8xl font-black tracking-tighter text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {words[currentWord]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              загружаю проекты • включаю анимации
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}