import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

export const updateGradient: EffectUpdateCanvas<{
  color1: string;
  color2: string;
}> = (canvasRef, params) => {
  if (canvasRef?.current) {
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvasRef.current.height
      );
      gradient.addColorStop(0, params.color1);
      gradient.addColorStop(1, params.color2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }
};

export const gradientUiRenderer: EffectUiRenderer<{
  color1: string;
  color2: string;
}> = ({ color1, color2 }, setEffectParams) => (
  <div className="space-y-4">
    <div className="flex gap-4 items-center">
      <div>
        <Label htmlFor="color1">Haut</Label>
        <Input
          type="color"
          id="color1"
          className="aspect-video w-auto"
          value={color1}
          onChange={(e) => setEffectParams({ color1: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="color2">Bas</Label>
        <Input
          type="color"
          id="color2"
          className="aspect-video w-auto"
          value={color2}
          onChange={(e) => setEffectParams({ color2: e.target.value })}
        />
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          setEffectParams({ color1: "#a1c4fd", color2: "#c2e9fb" })
        }
      >
        Dégradé Hiver
      </Button>
      <Button
        onClick={() =>
          setEffectParams({ color1: "#e6e9f0", color2: "#eef1f5" })
        }
      >
        Dégradé Neige
      </Button>
    </div>
  </div>
);
