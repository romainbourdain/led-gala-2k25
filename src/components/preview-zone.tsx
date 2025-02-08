import { forwardRef } from "react";
import { EffectCanvas } from "./effect-canvas";

export const PreviewZone = forwardRef<HTMLCanvasElement, unknown>((_, ref) => {
  return (
    <div className="border-4 w-full">
      <EffectCanvas ref={ref} />
    </div>
  );
});
