import { useEffect } from "react";

export default function PageLoader() {
  useEffect(() => {
    const loader = document.getElementById("site-loader");
    if (!loader) return;
    const root = document.getElementById("root");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let disposed = false;
    let leaving = false;
    let readyTimer;
    let removeTimer;

    const finish = () => {
      if (disposed || leaving) return;
      leaving = true;
      document.documentElement.classList.remove("is-site-loading");
      root?.removeAttribute("inert");
      root?.removeAttribute("aria-busy");
      loader.classList.add("site-loader-leaving");
      removeTimer = window.setTimeout(
        () => loader.remove(),
        reducedMotion ? 0 : 360,
      );
    };

    const scheduleFinish = () => {
      if (disposed || leaving) return;
      // Count from navigation so slow connections never incur another fixed delay.
      readyTimer = window.setTimeout(
        finish,
        reducedMotion ? 0 : Math.max(0, 650 - performance.now()),
      );
    };

    const onReady = () => {
      Promise.resolve(document.fonts?.ready).then(
        scheduleFinish,
        scheduleFinish,
      );
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    // Background services and slow images must never block entry to the site.
    const maximumTimer = window.setTimeout(
      finish,
      Math.max(0, 4000 - performance.now()),
    );
    return () => {
      disposed = true;
      window.removeEventListener("load", onReady);
      window.clearTimeout(readyTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(maximumTimer);
    };
  }, []);

  return null;
}
