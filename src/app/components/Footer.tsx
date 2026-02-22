import { Mail, Send, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 md:py-12 px-4 md:px-6 lg:px-20 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2024 Askar Khalilov. Все права защищены.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Сделано с кофе ☕ и Vue
          </p>
        </div>
      </div>
    </footer>
  );
}