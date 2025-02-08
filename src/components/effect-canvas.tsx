import { useSettingsStore } from "@/settings-store";
import { CanvasHTMLAttributes, forwardRef } from "react";

const EffectCanvas = forwardRef<
  HTMLCanvasElement,
  CanvasHTMLAttributes<HTMLCanvasElement>
>(({ ...props }, ref) => {
  const { width, height } = useSettingsStore();

  return (
    <canvas
      className="w-full h-full max-h-[300px]"
      style={{
        aspectRatio: `${width}/${height}`,
      }}
      {...props}
      ref={ref}
    ></canvas>
  );
});

EffectCanvas.displayName = "EffectCanvas";

export { EffectCanvas };
