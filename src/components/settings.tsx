import { useSettingsStore } from "@/settings-store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Settings = () => {
  const { x, y, width, height, rotate, setX, setY, setWidth, setHeight, setRotate } =
    useSettingsStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Position</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] place-items-center gap-4">
          <Label htmlFor="capture-zone-x">X</Label>
          <Input
            id="capture-zone-x"
            value={x}
            type="number"
            onChange={(e) => setX(parseInt(e.target.value))}
          />

          <Label htmlFor="capture-zone-y">Y</Label>
          <Input
            id="capture-zone-y"
            value={y}
            type="number"
            onChange={(e) => setY(parseInt(e.target.value))}
          />

          <Label htmlFor="capture-zone-width">Width</Label>
          <Input
            id="capture-zone-width"
            value={width}
            type="number"
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />

          <Label htmlFor="capture-zone-height">Height</Label>
          <Input
            id="capture-zone-height"
            value={height}
            type="number"
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />

          <Label htmlFor="capture-zone-rotate">Rotation</Label>
          <select
            id="capture-zone-rotate"
            value={rotate}
            onChange={(e) => setRotate(parseInt(e.target.value))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value={0}>0°</option>
            <option value={90}>90°</option>
            <option value={-90}>-90°</option>
            <option value={180}>180°</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
};
