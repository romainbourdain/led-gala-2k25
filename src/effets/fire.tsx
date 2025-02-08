import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

interface FireParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  colorFactor: number;
}

const createFireParticles = (
  count: number,
  width: number,
  height: number
): FireParticle[] => {
  return Array.from({ length: count }, () => {
    const distanceFromCenter = Math.abs((Math.random() - 0.5) * 2);
    return {
      x: width / 2 + (Math.random() - 0.5) * width * (1 - distanceFromCenter),
      y: height,
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * -3 - 1,
      opacity: Math.random() * 0.5 + 0.5,
      colorFactor: Math.random(),
    };
  });
};

export const updateFireEffect: EffectUpdateCanvas<{
  speed: number;
  height: number;
  particleFrequency: number;
}> = (canvasRef, params) => {
  if (!canvasRef?.current) return () => {};
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let particles = createFireParticles(
    params.particleFrequency,
    canvas.width,
    canvas.height
  );
  let animationFrameId: number;

  const animateFire = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      const progress = (canvas.height - particle.y) / canvas.height;
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size
      );

      const yellowFactor = Math.min(1, progress * 2);
      gradient.addColorStop(
        0,
        `rgba(255, ${140 + 100 * yellowFactor}, 0, ${particle.opacity})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(255, ${69 + 100 * yellowFactor}, 0, ${particle.opacity * 0.8})`
      );
      gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      particle.x += particle.speedX;
      particle.y += particle.speedY * params.speed;
      particle.size *= 0.98;
      particle.opacity -= 0.02;

      if (particle.y < canvas.height - params.height || particle.opacity <= 0) {
        particle.x =
          canvas.width / 2 +
          (Math.random() - 0.5) *
            canvas.width *
            (1 - Math.abs((Math.random() - 0.5) * 2));
        particle.y = canvas.height;
        particle.size = Math.random() * 20 + 10;
        particle.opacity = Math.random() * 0.5 + 0.5;
      }
    });

    // Régénérer les particules périodiquement
    if (particles.length < params.particleFrequency) {
      particles = [
        ...particles,
        ...createFireParticles(
          params.particleFrequency - particles.length,
          canvas.width,
          canvas.height
        ),
      ];
    }

    animationFrameId = requestAnimationFrame(animateFire);
  };
  animateFire();

  return () => cancelAnimationFrame(animationFrameId);
};

export const fireEffectUiRenderer: EffectUiRenderer<{
  speed: number;
  height: number;
  particleFrequency: number;
}> = ({ speed, height, particleFrequency }, setEffectParams) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="speed">Vitesse des flammes</Label>
      <Slider
        id="speed"
        className="w-full"
        value={[speed]}
        max={10}
        onValueChange={(val) => setEffectParams({ speed: val[0] })}
      />
    </div>
    <div>
      <Label htmlFor="height">Hauteur des flammes</Label>
      <Slider
        id="height"
        className="w-full"
        value={[height]}
        max={200}
        onValueChange={(val) => setEffectParams({ height: val[0] })}
      />
    </div>
    <div>
      <Label htmlFor="particleFrequency">
        Fréquence d'apparition des particules
      </Label>
      <Slider
        id="particleFrequency"
        className="w-full"
        value={[particleFrequency]}
        min={50}
        max={500}
        onValueChange={(val) => setEffectParams({ particleFrequency: val[0] })}
      />
    </div>
  </div>
);
