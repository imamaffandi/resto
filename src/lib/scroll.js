let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const scrollToId = (id) => {
  const target = id === "home" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
  } else if (target === 0) {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView();
  }
};

// onClick handler for in-page anchors: keeps real hrefs, routes through Lenis
export const anchorTo = (id) => (event) => {
  event.preventDefault();
  scrollToId(id);
};
