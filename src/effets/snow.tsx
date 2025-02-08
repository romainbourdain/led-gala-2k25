import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

const createSnowflakes = (
  count: number,
  width: number,
  height: number
): Snowflake[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: (Math.random() * 3 + 1) * 0.01,
    speed: (Math.random() * 2 + 1) * 0.01,
  }));
};

export const updateSnowEffect: EffectUpdateCanvas<{
  count: number;
  speed: number;
  size: number;
  backgroundColor: string;
  snowflakeColor: string;
}> = (canvasRef, params) => {
  if (!canvasRef?.current) return () => {};
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const snowflakes = createSnowflakes(
    params.count,
    canvas.width,
    canvas.height
  );

  let animationFrameId: number;

  const animateSnow = () => {
    ctx.fillStyle = params.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = params.snowflakeColor;

    snowflakes.forEach((flake) => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, params.size * flake.radius, 0, Math.PI * 2);
      ctx.fill();
      flake.y += params.speed * flake.speed;
      if (flake.y > canvas.height) {
        flake.y = 0;
        flake.x = Math.random() * canvas.width;
      }
    });
    animationFrameId = requestAnimationFrame(animateSnow);
  };
  animateSnow();

  return () => cancelAnimationFrame(animationFrameId);
};

export const snowEffectUiRenderer: EffectUiRenderer<{
  count: number;
  speed: number;
  size: number;
  backgroundColor: string;
  snowflakeColor: string;
}> = (
  { count, speed, size, backgroundColor, snowflakeColor },
  setEffectParams
) => (
  <>
    <div className="flex gap-4">
      <div className="w-44">
        <Label htmlFor="count">Nombre de flocons</Label>
        <Slider
          id="count"
          className="aspect-video w-auto"
          value={[count]}
          max={200}
          onValueChange={(val) => setEffectParams({ count: val[0] })}
        />
      </div>
      <div className="w-44">
        <Label htmlFor="speed">Vitesse</Label>
        <Slider
          id="speed"
          className="aspect-video w-auto"
          value={[speed]}
          max={500}
          onValueChange={(val) => setEffectParams({ speed: val[0] })}
        />
      </div>
      <div className="w-44">
        <Label htmlFor="size">Taille des flocons</Label>
        <Slider
          id="size"
          className="aspect-video w-auto"
          value={[size]}
          max={100}
          onValueChange={(val) => setEffectParams({ size: val[0] })}
        />
      </div>
    </div>
    <div className="flex gap-16">
      <div>
        <Label htmlFor="backgroundColor">Couleur du fond</Label>
        <Input
          type="color"
          id="backgroundColor"
          className="w-auto aspect-video"
          value={backgroundColor}
          onChange={(e) => setEffectParams({ backgroundColor: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="snowflakeColor">Couleur des flocons</Label>
        <Input
          type="color"
          id="snowflakeColor"
          className="w-auto aspect-video"
          value={snowflakeColor}
          onChange={(e) => setEffectParams({ snowflakeColor: e.target.value })}
        />
      </div>
    </div>
  </>
);
