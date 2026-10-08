import { cssTimeMs } from "./motion";

type EntranceOptions = {
  image?: boolean;
  group?: boolean;
  delay?: number;
  targets?: HTMLElement[];
  onReveal?: () => void;
};

const navigationKeys = new Set(["Tab", "Enter", " ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]);

// Progressive enhancement: server content is visible. Only content still below
// the first viewport is prepared, before paint. A late observer never dims an
// already-visible photograph or headline. Returning through a section does not
// replay its entrance.
export function bindScrollReveal(element: HTMLElement, { image = false, group = false, delay = 0, targets: selectedTargets, onReveal }: EntranceOptions = {}) {
  if (!("IntersectionObserver" in window) || !("animate" in element)) return () => {};
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const images = Array.from(element.querySelectorAll<HTMLImageElement>("img"));
  const children = Array.from(element.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
  const targets = selectedTargets ?? (image ? images : group || images.length > 0
    ? children.filter(child => child.tagName !== "IMG" && !child.querySelector("img"))
    : [element]);
  const tokens = getComputedStyle(element);
  const duration = cssTimeMs(tokens.getPropertyValue(image ? "--motion-scroll-image" : "--motion-reveal"), image ? 800 : 600);
  const stagger = cssTimeMs(tokens.getPropertyValue("--motion-stagger"), 60);
  const easing = tokens.getPropertyValue("--ease-out").trim() || "cubic-bezier(.23,1,.32,1)";
  const originals = targets.map(target => ({ target, opacity: target.style.opacity, transform: target.style.transform, endOpacity: getComputedStyle(target).opacity, endTransform: getComputedStyle(target).transform }));
  const animations = new Set<Animation>();
  let disposed = false;
  let started = false;
  let completed = false;
  let notified = false;
  let observer: IntersectionObserver | undefined;
  const pendingImages = new Set<() => void>();

  function restore() {
    originals.forEach(({ target, opacity, transform }) => {
      target.style.opacity = opacity;
      target.style.transform = transform;
    });
  }

  function notify() {
    if (notified) return;
    notified = true;
    onReveal?.();
  }

  function complete() {
    if (completed || disposed) return;
    completed = true;
    observer?.disconnect();
    pendingImages.forEach(cancel => cancel());
    animations.forEach(animation => animation.cancel());
    animations.clear();
    restore();
    element.dataset.scrollState = "complete";
    element.dataset.scrollRevealed = "true";
    notify();
  }

  const rect = element.getBoundingClientRect();
  if (element.dataset.scrollRevealed === "true" || preference.matches || rect.top < window.innerHeight || targets.length === 0) {
    complete();
    return () => { disposed = true; };
  }

  // Photos never change opacity. A small crop settling movement applies to the
  // inner image, leaving its frame and adjacent reading content stable.
  originals.forEach(({ target }) => {
    if (!image) target.style.opacity = "0";
    target.style.transform = image ? "scale(1.025)" : "translateY(8px)";
  });
  element.dataset.scrollState = "pending";

  function readyImage(img: HTMLImageElement) {
    return new Promise<void>(resolve => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        img.removeEventListener("load", decode);
        img.removeEventListener("error", finish);
        pendingImages.delete(finish);
        resolve();
      };
      const decode = () => {
        if (typeof img.decode === "function") img.decode().catch(() => {}).then(finish);
        else finish();
      };
      const timeout = window.setTimeout(finish, 1200);
      pendingImages.add(finish);
      img.addEventListener("load", decode, { once: true });
      img.addEventListener("error", finish, { once: true });
      if (img.complete) decode();
    });
  }

  async function reveal() {
    if (started || completed || disposed) return;
    started = true;
    observer?.disconnect();
    if (image) {
      element.dataset.scrollState = "decoding";
      await Promise.all(images.map(readyImage));
    }
    if (completed || disposed) return;
    const current = element.getBoundingClientRect();
    if (preference.matches || current.bottom <= 0 || current.top >= window.innerHeight) { complete(); return; }
    element.dataset.scrollState = "running";
    try {
      originals.forEach(({ target, endOpacity, endTransform }, index) => {
        const frames = image
          ? [{ transform: "scale(1.025)" }, { transform: endTransform }]
          : [{ opacity: 0, transform: "translateY(8px)" }, { opacity: endOpacity, transform: endTransform }];
        // Bound each level separately, preserving the reading order even in
        // the last comparison row. Stagger never delays focus or interaction.
        const rowDelay = Math.min(3, Math.max(0, delay)) * stagger;
        const contentDelay = group ? Math.min(3, index) * stagger : 0;
        const animation = target.animate(frames, { duration, delay: rowDelay + contentDelay, easing, fill: "both" });
        animations.add(animation);
        animation.addEventListener("finish", () => {
          animations.delete(animation);
          animation.cancel();
          if (animations.size === 0) complete();
        }, { once: true });
      });
    } catch {
      // An unsupported animation must never leave enhanced content hidden.
      complete();
      return;
    }
    restore();
    notify();
  }

  const handlePreference = () => { if (preference.matches) complete(); };
  const handleKey = (event: KeyboardEvent) => { if (navigationKeys.has(event.key)) complete(); };
  const handleFocus = () => complete();
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) void reveal();
  }, { threshold: .08, rootMargin: "0px 0px -6% 0px" });
  observer.observe(element);
  preference.addEventListener("change", handlePreference);
  document.addEventListener("keydown", handleKey);
  element.addEventListener("focusin", handleFocus);

  return () => {
    disposed = true;
    observer?.disconnect();
    preference.removeEventListener("change", handlePreference);
    document.removeEventListener("keydown", handleKey);
    element.removeEventListener("focusin", handleFocus);
    pendingImages.forEach(cancel => cancel());
    animations.forEach(animation => animation.cancel());
    restore();
    if (!completed) delete element.dataset.scrollState;
  };
}
