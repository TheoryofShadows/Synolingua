import { useState, useEffect } from "react";

export function Fade({ children, id }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [id]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
