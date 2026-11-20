import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 450, damping: 38, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 38, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, textarea, [role="button"]');
      setHoveringInteractive(Boolean(interactive));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [cursorX, cursorY, visible]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      style={{ x: springX, y: springY }}
    >
      <div
        className={`rounded-full transition-transform duration-150 ${
          hoveringInteractive
            ? 'w-10 h-10 border border-amber-300/60 bg-amber-400/10 scale-110'
            : 'w-6 h-6 border border-amber-200/35 bg-amber-300/5 scale-100'
        }`}
      />
    </motion.div>
  );
}
