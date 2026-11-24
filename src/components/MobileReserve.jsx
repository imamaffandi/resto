import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { anchorTo } from "../lib/scroll";

// Small screens: once past the hero, a reservation button stays within thumb reach,
// and steps aside while the reservation form itself is on screen
const MobileReserve = () => {
  const bar = useRef(null);

  useGSAP(() => {
    gsap.set(bar.current, { yPercent: 160 });
    let past = false;
    let atForm = false;
    const apply = () =>
      gsap.to(bar.current, { yPercent: past && !atForm ? 0 : 160, duration: 0.5, ease: "power3.out", overwrite: true });

    ScrollTrigger.create({
      trigger: "#tentang",
      start: "top 60%",
      end: "max",
      onToggle: (self) => {
        past = self.isActive;
        apply();
      },
    });
    ScrollTrigger.create({
      trigger: "#reservasi",
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        atForm = self.isActive;
        apply();
      },
    });
  });

  return (
    <div ref={bar} className="fixed inset-x-4 bottom-4 z-30 sm:hidden">
      <a
        href="#reservasi"
        onClick={anchorTo("reservasi")}
        className="btn-solid w-full shadow-[0_12px_30px_-10px_rgba(29,27,24,0.55)]"
      >
        Reservasi Sekarang
      </a>
    </div>
  );
};

export default MobileReserve;
