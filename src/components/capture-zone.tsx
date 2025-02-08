import { useSettingsStore } from "@/settings-store";
import { forwardRef } from "react";
import { EffectCanvas } from "./effect-canvas";

export const CaptureZone = forwardRef<HTMLCanvasElement, unknown>((_, ref) => {
  const { x, y, width, height, rotate } = useSettingsStore();
  return (
    <div
      className="fixed"
      style={{
        width,
        height,
        rotate: `${rotate}deg`,
        left: `calc(-${width / 2}px + ${height / 2}px + ${x}px)`,
        top: `calc(-${height / 2}px + ${width / 2}px + ${y}px)`,
      }}
    >
      <EffectCanvas ref={ref} />
    </div>
  );
});
