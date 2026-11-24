let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

// Fixed header height, so anchored sections don't land underneath it
const HEADER_OFFSET = -72;

export const scrollToId = (id) => {
  const target = id === "beranda" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, offset: target === 0 ? 0 : HEADER_OFFSET });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0 });
    return;
  }
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET });
};

// onClick handler for in-page anchors: keeps real hrefs, routes through Lenis.
// `after` closes whatever overlay the link lives in; scrolling is unlocked first so Lenis can move.
export const anchorTo = (id, after) => (event) => {
  event.preventDefault();
  if (after) {
    after();
    lockScroll(false);
  }
  scrollToId(id);
  history.replaceState(null, "", `#${id}`);
};

// Freeze page scroll while an overlay (mobile menu, lightbox) is open
export const lockScroll = (locked) => {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
};
