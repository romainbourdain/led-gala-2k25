import { useSettingsStore } from "@/settings-store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Settings = () => {
  const { x, y, width, height, setX, setY, setWidth, setHeight } =
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
        </div>
      </CardContent>
    </Card>
  );
};
