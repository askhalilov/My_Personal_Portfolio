import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import {
  ExternalLink,
  Monitor,
  Smartphone,
  Globe,
  Github
} from 'lucide-react';
import { detectMobileDevice } from '../lib/device';

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  category: string;
  stack: string;
  tags: string[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  company?: string;
  year?: string;
  countries?: string[];
}

type ViewMode = 'desktop' | 'mobile';


const COUNTRY_META: Record<string, { name: string; flag: string }> = {
  RU: { name: 'Россия', flag: '🇷🇺' },
  DE: { name: 'Германия', flag: '🇩🇪' },
  AT: { name: 'Австрия', flag: '🇦🇹' },
  IT: { name: 'Италия', flag: '🇮🇹' },
  PH: { name: 'Филиппины', flag: '🇵🇭' }
};


// Public assets ("public/") must respect Vite BASE_URL on GitHub Pages.
// This keeps both absolute '/assets/..' and relative 'assets/..' working.
function publicUrl(src?: string) {
  if (!src) return '';
  if (/^(https?:|data:|blob:|mailto:|tel:)/i.test(src)) return src;
  const clean = src.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}

function hashHue(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}

function CoverFallback({ seed, title, stack }: { seed: string; title: string; stack: string }) {
  const hue = hashHue(seed);
  const a = `hsla(${hue}, 85%, 60%, 0.55)`;
  const b = `hsla(${(hue + 60) % 360}, 85%, 55%, 0.45)`;

  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          `radial-gradient(120% 120% at 10% 10%, ${a} 0%, rgba(0,0,0,0) 55%),` +
          `radial-gradient(120% 120% at 90% 20%, ${b} 0%, rgba(0,0,0,0) 60%),` +
          `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.55))`
      }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="rounded-2xl border border-white/10 bg-background/35 backdrop-blur-xl p-4">
          <div className="text-[11px] text-white/70">{stack}</div>
          <div
            className="mt-1 text-lg font-black leading-snug line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({
  id = '',
  title,
  description,
  category,
  stack,
  tags,
  images,
  demoUrl,
  githubUrl,
  company,
  year
  ,countries
}: ProjectCardProps) {
  
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = () => setIsMobileViewport(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const update = () => setIsMobileDevice(detectMobileDevice());
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  const cover = (images ?? [])?.[0];

  const [coverOk, setCoverOk] = useState(true);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const kickIframeMedia = useCallback(() => {
    // Many demos rely on video-hero and autoplay. In iframes browsers can block autoplay unless muted/allowed.
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      doc.querySelectorAll('video').forEach((v) => {
        try {
          // @ts-ignore
          v.muted = true;
          // @ts-ignore
          v.playsInline = true;
          // @ts-ignore
          v.autoplay = true;
          // @ts-ignore
          v.loop = true;
          // @ts-ignore
          v.play?.().catch?.(() => {});
        } catch {}
      });
    } catch {
      // cross-origin or blocked access — ignore
    }
  }, []);

  const hasLive = Boolean(demoUrl);
  const hasGithub = Boolean(githubUrl);

  // Live demos are auto-rusified only inside iframes by landing-library itself.
  // Keep URLs clean; use BASE_URL for local demos so GitHub Pages works.
  const demoSrc = demoUrl ? publicUrl(demoUrl) : '';
  const githubSrc = githubUrl ? githubUrl : '';

  const [demoOpened, setDemoOpened] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Mobile device policy: show description only; open demo in a new tab.
    // Desktop keeps the existing embedded preview behavior.
    setDemoOpened(!isMobileViewport);
    setDetailsOpen(false);
    setViewMode(isMobileViewport ? 'mobile' : 'desktop');
  }, [open, isMobileViewport]);

  const stackList = useMemo(() => (stack ? stack.split(', ').filter(Boolean) : []), [stack]);
  const shownStack = stackList.slice(0, 5);
  const stackMore = Math.max(0, stackList.length - shownStack.length);
  const shownTags = (tags ?? []).slice(0, 6);
  const tagsMore = Math.max(0, (tags ?? []).length - shownTags.length);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setViewMode('desktop');
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full text-left"
          aria-label={`Открыть предпросмотр проекта: ${title}`}
        >
          <GlassCard className="h-[650px] sm:h-[670px] overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
            <div className="h-full flex flex-col">
              {/* Cover */}
              <div className="relative h-[220px] w-full shrink-0 overflow-hidden">
                {cover && coverOk ? (
                  <img
                    src={publicUrl(cover)}
                    alt={title}
                    loading="lazy"
                    onError={() => setCoverOk(false)}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <CoverFallback seed={id || title} title={title} stack={category} />
                )}

                {/* Readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />

                {/* quick hint */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {hasLive && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] bg-background/45 border border-border/60 backdrop-blur text-foreground/90">
                      Демо
                    </span>
                  )}
                  {hasGithub && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] bg-background/45 border border-border/60 backdrop-blur text-foreground/90">
                      GitHub
                    </span>
                  )}
                </div>

                {/* Personal caption (always) */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="rounded-2xl border border-white/10 bg-background/35 backdrop-blur-xl px-4 py-3">
                    <div className="text-[11px] uppercase tracking-wider text-foreground/70">
                      {category}
                      {year ? ` • ${year}` : ''}
                    </div>
                    {countries?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {countries.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/35 px-2 py-0.5 text-[11px] text-foreground/80 backdrop-blur"
                          >
                            <span>{COUNTRY_META[c]?.flag}</span>
                            <span>{COUNTRY_META[c]?.name}</span>
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div
                      className="mt-1 text-base font-black leading-snug line-clamp-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                    {category}
                  </div>
                  {year && <div className="text-xs text-muted-foreground">{year}</div>}
                </div>

                <h3
                  className="text-xl font-bold mb-2 tracking-tight line-clamp-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>

                {company && (
                  <div className="text-xs text-muted-foreground mb-4 line-clamp-1">{company}</div>
                )}

                <div className="flex flex-wrap gap-2 mb-4 max-h-[84px] overflow-hidden">
                  {shownStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs bg-card border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {stackMore > 0 && (
                    <span className="px-3 py-1 rounded-full text-xs bg-card border border-border text-muted-foreground">
                      +{stackMore}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 max-h-[84px] overflow-hidden">
                  {shownTags.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs bg-card border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {tagsMore > 0 && (
                    <span className="px-3 py-1 rounded-full text-xs bg-card border border-border text-muted-foreground">
                      +{tagsMore}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 text-xs text-muted-foreground flex items-center justify-between">
                  <span className="line-clamp-1">{company ?? ''}</span>
                  <span className="opacity-70">Нажми для просмотра</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          // Fullscreen on mobile, centered panel on desktop
          'p-0 w-[100dvw] h-[100dvh] top-0 left-0 translate-x-0 translate-y-0 rounded-none border-0 bg-background/70 backdrop-blur-xl shadow-2xl',
          'sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:h-[92vh] sm:w-full sm:max-w-6xl sm:rounded-3xl sm:border sm:border-border/70'
        )}
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* Ambient gradient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(1200px circle at 15% 0%, var(--glow-blue), transparent 55%), radial-gradient(900px circle at 90% 10%, var(--glow-purple), transparent 60%)'
            }}
          />
          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          <div className="relative z-10 flex h-full flex-col">
            {/* Top bar */}
            <div className="shrink-0 border-b border-border/60 bg-background/45 backdrop-blur-xl">
              <div className="p-4 sm:p-6">
                <DialogHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <DialogTitle
                        className={cn('font-black', isMobileViewport ? 'text-lg leading-tight' : 'text-xl sm:text-2xl')}
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {title}
                      </DialogTitle>
                      <DialogDescription
                        className={cn(
                          'mt-2 text-sm sm:text-base',
                          isMobileViewport && !detailsOpen && !isMobileDevice ? 'clamp-1 opacity-80' : ''
                        )}
                      >
                        {description}
                      </DialogDescription>
                    </div>

                    {/* External links */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Mobile UX: we show a single centered "Open demo" CTA below the description. */}
                      {!isMobileDevice && (
                        <>
                          {hasGithub && githubSrc && (
                            <Button asChild size="sm" variant="outline" className="rounded-2xl">
                              <a href={githubSrc} target="_blank" rel="noreferrer">
                                <Github className="w-4 h-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          {hasLive && demoSrc && (
                            <Button asChild size="sm" className="rounded-2xl">
                              <a href={demoSrc} target="_blank" rel="noreferrer">
                                <ExternalLink className="w-4 h-4" />
                                Демо
                              </a>
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    {(!isMobileViewport || detailsOpen) && (
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="px-2.5 py-1 rounded-full bg-card/70 border border-border/70 backdrop-blur">
                        {category}
                      </span>
                      {year && (
                        <span className="px-2.5 py-1 rounded-full bg-card/70 border border-border/70 backdrop-blur">
                          {year}
                        </span>
                      )}
                      {company && (
                        <span className="px-2.5 py-1 rounded-full bg-card/70 border border-border/70 backdrop-blur">
                          {company}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-card/70 border border-border/70 backdrop-blur">
                        {stack}
                      </span>
                      {countries?.length ? (
                        <span className="px-2.5 py-1 rounded-full bg-card/70 border border-border/70 backdrop-blur">
                          {countries
                            .map((c) => COUNTRY_META[c]?.flag + ' ' + COUNTRY_META[c]?.name)
                            .filter(Boolean)
                            .join(' • ')}
                        </span>
                      ) : null}
                    </div>
                    )}


                    {isMobileViewport && !isMobileDevice && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="rounded-2xl px-3"
                        onClick={() => setDetailsOpen((v) => !v)}
                      >
                        {detailsOpen ? 'Скрыть детали' : 'Детали'}
                      </Button>
                    )}

                    {/* View mode: desktop only. Mobile devices open demo in a new tab. */}
                    {!isMobileDevice && (
                      <div className="inline-flex items-center rounded-2xl border border-border/70 bg-card/60 backdrop-blur p-1">
                        <button
                          type="button"
                          onClick={() => setViewMode('desktop')}
                          className={cn(
                            'inline-flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-all',
                            viewMode === 'desktop'
                              ? 'bg-background/60 text-foreground border border-border/70'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          <Monitor className="w-4 h-4" />
                          Десктоп
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('mobile')}
                          className={cn(
                            'inline-flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-all',
                            viewMode === 'mobile'
                              ? 'bg-background/60 text-foreground border border-border/70'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          <Smartphone className="w-4 h-4" />
                          Мобайл
                        </button>
                      </div>
                    )}
                  </div>
                
</DialogHeader>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {isMobileDevice ? (
                <div className="h-full overflow-y-auto px-5 py-6">
                  {/* Countries note (optional) */}
                  {countries?.length ? (
                    <div className="mb-4 text-sm text-muted-foreground">
                      Рынок:{' '}
                      <span className="text-foreground/90">
                        {countries
                          .map((c) => COUNTRY_META[c]?.flag + ' ' + COUNTRY_META[c]?.name)
                          .filter(Boolean)
                          .join(' • ')}
                      </span>
                    </div>
                  ) : null}

                  {/* Single centered CTA */}
                  <div className="mt-6 flex justify-center">
                    {hasLive && demoSrc ? (
                      <Button asChild size="lg" className="rounded-2xl w-full max-w-[360px]">
                        <a href={demoSrc} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-5 h-5" />
                          Посетить демо для просмотра
                        </a>
                      </Button>
                    ) : hasGithub && githubSrc ? (
                      <Button asChild size="lg" className="rounded-2xl w-full max-w-[360px]">
                        <a href={githubSrc} target="_blank" rel="noreferrer">
                          <Github className="w-5 h-5" />
                          Открыть на GitHub
                        </a>
                      </Button>
                    ) : (
                      <Button size="lg" disabled className="rounded-2xl w-full max-w-[360px]">
                        Нет демо
                      </Button>
                    )}
                  </div>

                  <div className="mt-3 text-center text-xs text-muted-foreground">
                    Демо откроется в новой вкладке — так анимации и видео работают стабильнее на телефоне.
                  </div>
                </div>
              ) : (
                (() => {
                const previewNode = (
                  <div
                    className={cn(
                      'relative',
                      viewMode === 'mobile' && !isMobileViewport ? 'max-w-[430px] mx-auto' : 'w-full'
                    )}
                  >
                    {/* Preview container */}
                    <div
                      className={cn(
                        // Keep desktop sizing unchanged; on real mobile give the demo most of the viewport.
                        isMobileViewport
                          ? 'h-[calc(100dvh-220px)] min-h-[360px]'
                          : viewMode === 'mobile'
                            ? 'h-[72vh]'
                            : 'h-[78vh]',
                        'border border-border/70 bg-card/40 backdrop-blur overflow-hidden shadow-2xl',
                        viewMode === 'mobile'
                          ? (isMobileViewport ? 'rounded-[2.25rem] p-2' : 'rounded-[2.75rem] p-3')
                          : 'rounded-3xl'
                      )}
                    >
                      <div
                        className={cn(
                          'h-full overflow-hidden bg-background',
                          viewMode === 'mobile'
                            ? (isMobileViewport ? 'rounded-[1.85rem] border border-border/50' : 'rounded-[2.25rem] border border-border/50')
                            : 'rounded-2xl'
                        )}
                      >
                        {/* Mobile gate: don't load heavy iframes until user asks */}
                        {isMobileViewport && !demoOpened ? (
                          <div className="relative h-full">
                            {cover ? (
                              <img
                                src={publicUrl(cover)}
                                alt="preview"
                                className="absolute inset-0 h-full w-full object-cover opacity-70"
                              />
                            ) : null}
                            <div className="absolute inset-0 bg-black/55" />

                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                              <div className="text-sm text-white/80">
                                На телефоне сначала открываем превью, а затем включаем демо.
                              </div>
                              <Button
                                type="button"
                                size="lg"
                                className="mt-4 rounded-2xl"
                                onClick={() => setDemoOpened(true)}
                              >
                                <Globe className="w-5 h-5" />
                                Перейти в Демо
                              </Button>
                              <div className="mt-3 text-xs text-white/60">
                                В демо — анимации, интерактив и реальные состояния.
                              </div>
                            </div>
                          </div>
                        ) : hasLive && demoSrc ? (
                          <iframe
                            ref={iframeRef}
                            onLoad={kickIframeMedia}
                            src={demoSrc}
                            title={`${title} live demo`}
                            className="h-full w-full bg-background"
                            loading="eager"
                            allow="autoplay; fullscreen; clipboard-read; clipboard-write; encrypted-media; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                            Нет демо для этого проекта.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );

                // Desktop keeps the original ScrollArea behavior; mobile uses native scroll.
                return isMobileViewport ? (
                  <div className="h-full p-3">{previewNode}</div>
                ) : (
                  <ScrollArea className="h-full">
                    <div className="p-4 sm:p-6">{previewNode}</div>
                  </ScrollArea>
                );
              })()
              )}
            </div>


          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
