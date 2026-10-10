/**
 * Vanilla JavaScript Carousel Controller
 * Kontrak markup (atribut data-*):
 * [data-carousel]               root; atribut opsional data-start="center" | angka (default 0)
 *   [data-carousel-track]       overflow-x:auto; scroll-snap-type:x mandatory; scrollbar disembunyikan
 *     [data-carousel-item]*     scroll-snap-align:center
 *   [data-carousel-prev]        <button>
 *   [data-carousel-next]        <button>
 *   [data-carousel-dot]*        <button>, urut sesuai item
 */
export function initCarousel(root) {
  if (!root || root.dataset.ready === "true") return;

  const track = root.querySelector("[data-carousel-track]");
  const items = Array.from(root.querySelectorAll("[data-carousel-item]"));
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));

  const n = items.length;
  if (n === 0) return;

  // Determine initial index
  let initialIndex = 0;
  const startAttr = root.dataset.start;
  if (startAttr === "center") {
    initialIndex = Math.floor(n / 2);
  } else if (startAttr !== undefined && startAttr !== null && !isNaN(Number(startAttr))) {
    initialIndex = Math.max(0, Math.min(n - 1, parseInt(startAttr, 10)));
  }

  let currentIndex = initialIndex;

  function isReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  let isProgrammaticScrolling = false;
  let programmaticTimer = null;

  function endProgrammaticScroll() {
    if (programmaticTimer) {
      clearTimeout(programmaticTimer);
      programmaticTimer = null;
    }
    isProgrammaticScrolling = false;
  }

  if (track) {
    track.addEventListener("scrollend", endProgrammaticScroll);
  }

  function setActive(i, options = {}) {
    const { scroll = false, instant = false } = options;
    const clamped = Math.max(0, Math.min(n - 1, i));
    currentIndex = clamped;

    items.forEach((item, idx) => {
      item.dataset.active = idx === clamped ? "true" : "false";
    });

    dots.forEach((dot, idx) => {
      if (idx === clamped) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (prevBtn) {
      prevBtn.disabled = clamped === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = clamped === n - 1;
    }

    if (scroll && track && track.scrollWidth > track.clientWidth + 1) {
      isProgrammaticScrolling = true;
      if (programmaticTimer) clearTimeout(programmaticTimer);
      programmaticTimer = setTimeout(endProgrammaticScroll, 400);

      const activeItem = items[clamped];
      if (activeItem) {
        const behavior = instant || isReducedMotion() ? "auto" : "smooth";
        const targetLeft = activeItem.offsetLeft - (track.clientWidth - activeItem.clientWidth) / 2;
        track.scrollTo({ left: targetLeft, behavior });
      }
    }
  }

  // Prev / Next click listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      setActive(currentIndex - 1, { scroll: true });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      setActive(currentIndex + 1, { scroll: true });
    });
  }

  // Dots click listeners
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      setActive(idx, { scroll: true });
    });
  });

  // Track scroll listener (debounced 80ms)
  let scrollTimeout = null;
  if (track) {
    track.addEventListener(
      "scroll",
      () => {
        if (isProgrammaticScrolling) return;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (isProgrammaticScrolling) return;

          let targetIdx;
          if (track.scrollLeft <= 1) {
            targetIdx = 0;
          } else if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
            targetIdx = n - 1;
          } else {
            const trackCenter = track.scrollLeft + track.clientWidth / 2;
            let closestIdx = currentIndex;
            let minDiff = Infinity;

            items.forEach((item, idx) => {
              const itemCenter = item.offsetLeft + item.clientWidth / 2;
              const diff = Math.abs(trackCenter - itemCenter);
              if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
              }
            });
            targetIdx = closestIdx;
          }

          if (targetIdx !== currentIndex) {
            setActive(targetIdx, { scroll: false });
          }
        }, 80);
      },
      { passive: true }
    );
  }

  // Keyboard navigation within root
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(currentIndex - 1, { scroll: true });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive(currentIndex + 1, { scroll: true });
    }
  });

  // Window resize listener (debounced 150ms)
  let resizeTimeout = null;
  window.addEventListener("resize", () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setActive(currentIndex, { scroll: true, instant: true });
    }, 150);
  });

  // Initial activation
  setActive(initialIndex, { scroll: true, instant: true });
  requestAnimationFrame(() => {
    setActive(currentIndex, { scroll: true, instant: true });
  });

  root.dataset.ready = "true";
}
