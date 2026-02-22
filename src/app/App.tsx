import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerBand } from './components/TickerBand';
import { RulesSection } from './components/RulesSection';
import { ProcessSection } from './components/ProcessSection';
import { SkillsSection } from './components/SkillsSection';
import { HighlightSection } from './components/HighlightSection';
import { WorksSection } from './components/WorksSection';
import { AboutSection } from './components/AboutSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { DecorativeBackground } from './components/DecorativeBackground';
import { initDeviceAttributes } from './lib/device';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    // Device initialization for responsive UX (mobile/desktop/touch)
    initDeviceAttributes();
  }, []);

  useEffect(() => {
    // Safety fallback: if anything goes wrong, hide the loader after a while.
    // (The normal path is controlled by the Loader component.)
    const hardTimeout = setTimeout(() => setLoading(false), 8000);
    return () => clearTimeout(hardTimeout);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
    } else {
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#000000';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div 
      className={`relative min-h-screen ${!isTouchDevice ? 'cursor-none' : ''}`}
      style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#000000' }}
    >
      {/* Decorative background */}
      <DecorativeBackground />
      
      {/* Custom cursor */}
      {!isTouchDevice && <CustomCursor />}

      {/* Navigation */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <TickerBand />
        <SectionDivider />
        <RulesSection />
        <SectionDivider />
        <ProcessSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <HighlightSection />
        <SectionDivider />
        <WorksSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}