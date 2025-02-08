import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

export const updateSolidColor: EffectUpdateCanvas<{
  color: string;
  strobe: boolean;
}> = (canvasRef, params) => {
  if (!canvasRef?.current) return () => {};
  const ctx = canvasRef.current.getContext("2d");
  if (!ctx) return () => {};

  let isOn = true;
  let timeoutId: NodeJS.Timeout;

  const render = () => {
    ctx.fillStyle = isOn ? params.color : "black";
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    isOn = !isOn;
    if (params.strobe) {
      timeoutId = setTimeout(render, 200);
    }
  };
  render();

  return () => clearTimeout(timeoutId);
};

export const solidColorUiRenderer: EffectUiRenderer<{
  color: string;
  strobe: boolean;
}> = ({ color, strobe }, setEffectParams) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="color">Palette</Label>
      <Input
        type="color"
        id="color"
        className="aspect-video w-auto"
        value={color}
        onChange={(e) => setEffectParams({ color: e.target.value })}
      />
    </div>
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => setEffectParams({ color: "#ff0000" })}>
        Rouge
      </Button>
      <Button onClick={() => setEffectParams({ color: "#00ff00" })}>
        Vert
      </Button>
      <Button onClick={() => setEffectParams({ color: "#0000ff" })}>
        Bleu
      </Button>
    </div>
    <div className="mt-4">
      <Label>Stroboscope</Label>
      <Button onClick={() => setEffectParams({ strobe: !strobe })}>
        {strobe ? "Désactiver" : "Activer"}
      </Button>
    </div>
  </div>
);
