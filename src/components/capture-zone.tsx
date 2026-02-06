import { useSettingsStore } from "@/settings-store";
import { forwardRef } from "react";
import { EffectCanvas } from "./effect-canvas";

export const CaptureZone = forwardRef<HTMLCanvasElement, unknown>((_, ref) => {
  const { x, y, width, height, rotate } = useSettingsStore();

  // Calculer les offsets pour compenser la rotation
  let offsetX = 0;
  let offsetY = 0;

  if (rotate === -90) {
    offsetY = width;
  } else if (rotate === 90) {
    offsetX = height;
  } else if (rotate === 180) {
    offsetX = width;
    offsetY = height;
  }

  return (
    <div
      className="fixed"
      style={{
        width,
        height,
        transform: `translate(${x + offsetX}px, ${y + offsetY}px) rotate(${rotate}deg)`,
        transformOrigin: '0 0',
        left: 0,
        top: 0,
      }}
    >
      <EffectCanvas ref={ref} />
    </div>
  );
});
