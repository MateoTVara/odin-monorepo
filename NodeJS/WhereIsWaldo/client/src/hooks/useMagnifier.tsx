import { useState } from "react";

const MAGNIFIER_ENABLED_KEY = "magnifierEnabled";
const MAGNIFIER_SIZE = 140;
const MAGNIFIER_ZOOM = 2.5;  

export default function useMagnifier() {
  const [hoverPosition, setHoverPosition] = useState<{x: number, y: number} | null>(null);
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem(MAGNIFIER_ENABLED_KEY);
    return saved === "true";
  });
  
  const handleImageMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    setHoverPosition({ x, y });
  };

  const handleImageMouseLeave = () => {
    setHoverPosition(null);
  };

  const toggleMagnifier = () => {
    setEnabled(prev => {
      const next = !prev;

      localStorage.setItem(MAGNIFIER_ENABLED_KEY, String(next));

      if (!next) setHoverPosition(null);

      return next;
    });
  };

  return {
    hoverPosition,
    handleImageMouseMove,
    handleImageMouseLeave,
    enabled,
    toggleMagnifier,
    MAGNIFIER_SIZE,
    MAGNIFIER_ZOOM
  };
}