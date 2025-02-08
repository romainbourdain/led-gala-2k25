import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

import bdf from "../../public/images/bdf.png";
import bureauDesFetes from "../../public/images/bureau-de-fetes.png";
import feu from "../../public/images/feu.jpg";
import gala from "../../public/images/gala.png";

export const updateImage: EffectUpdateCanvas<{ image: string }> = (
  canvasRef,
  params
) => {
  if (!canvasRef?.current) return;

  const ctx = canvasRef.current.getContext("2d");
  if (!ctx || !params.image) return;

  const img = new Image();
  img.src = params.image;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(
      img,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };
};

export const imageUiRenderer: EffectUiRenderer<{ image: string }> = (
  _,
  setEffectParams
) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="image">Image</Label>
      <Input
        type="file"
        id="image"
        accept="image/*"
        className="aspect-video w-auto"
        onChange={(event) => {
          if (!event.target.files) return;

          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (!e.target?.result) return;

              setEffectParams({ image: e.target!.result as string });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => setEffectParams({ image: gala })}>Gala</Button>
      <Button onClick={() => setEffectParams({ image: bdf })}>BDF</Button>
      <Button onClick={() => setEffectParams({ image: bureauDesFetes })}>
        Bureau des fêtes
      </Button>
      <Button onClick={() => setEffectParams({ image: feu })}>Feu</Button>
    </div>
  </div>
);
