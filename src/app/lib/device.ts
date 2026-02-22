// Minimal device initialization used by the UI (data attributes on <html>)
// Helps us implement mobile-only behavior in the portfolio viewer.

export function detectMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isUA = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(ua);
  const isCoarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const isSmall = window.matchMedia?.('(max-width: 768px)').matches ?? false;
  return isUA || (isCoarse && isSmall);
}

export function initDeviceAttributes() {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = detectMobileDevice();

  root.dataset.device = isMobile ? 'mobile' : 'desktop';
  root.dataset.touch = isTouch ? '1' : '0';
}
