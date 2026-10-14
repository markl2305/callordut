import type { CSSProperties, ReactNode } from "react";

/* Reveal-once wrappers on the site system (.cl-reveal in system.css, driven by
   heritage/RevealObserver). Server-rendered and visible with JS off; the earlier
   framer-motion versions rendered opacity:0 into the HTML. Signatures kept. */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const style = delay ? ({ transitionDelay: `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined;
  return (
    <div className={`cl-reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className = "" }: StaggerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`cl-reveal ${className}`.trim()}>{children}</div>;
}

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

/* No count-ups in the system: the final value, always. */
export function AnimatedCounter({ target, prefix = "", suffix = "", className = "" }: CounterProps) {
  return <span className={className}>{`${prefix}${target}${suffix}`}</span>;
}

export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative ${className}`}>
      <div className="relative h-full rounded-[22px] border border-rule bg-cream p-6 transition-colors duration-300 group-hover:border-teal/40">
        {children}
      </div>
    </div>
  );
}
