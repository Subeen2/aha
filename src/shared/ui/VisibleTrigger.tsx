import React, { useEffect, useRef } from "react";

interface VisibleTriggerI {
  children: React.ReactNode;
  onVisible: () => void;
  threshold: number;
}

const VisibleTrigger = ({
  children,
  onVisible,
  threshold = 0.5,
}: VisibleTriggerI) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold }
    );
    const target = ref.current;
    if (target) {
      observer.observe(target);
    }
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [onVisible, threshold]);
  return <div ref={ref}>{children}</div>;
};

export default VisibleTrigger;
