import { useEffect, useRef, useState } from "react";
import { CaptureZone } from "./components/capture-zone";
import { PreviewZone } from "./components/preview-zone";
import { Settings } from "./components/settings";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { effects } from "./effets/effets";

export const LEDWallApp = () => {
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedEffect, setSelectedEffect] =
    useState<keyof typeof effects>("color");

  const [effectParams, setEffectParams] = useState(effects);

  useEffect(() => {
    const captureUnsubscribe = effects[selectedEffect].updateCanvas(
      captureCanvasRef,
      effectParams[selectedEffect].params
    );
    const previewUnsubscribe = effects[selectedEffect].updateCanvas(
      previewCanvasRef,
      effectParams[selectedEffect].params
    );
    return () => {
      if (captureUnsubscribe && previewUnsubscribe) {
        captureUnsubscribe();
        previewUnsubscribe();
      }
    };
  }, [selectedEffect, effectParams]);

  return (
    <>
      <CaptureZone ref={captureCanvasRef} />
      <div className="flex flex-col h-screen max-w-screen-lg mx-auto my-4 space-y-4 px-4">
        <h1 className="text-4xl font-bold">Mur de LED</h1>
        <div className="flex items-start gap-10 max-md:flex-col">
          <PreviewZone ref={previewCanvasRef} />
          <Settings />
        </div>
        <Tabs
          defaultValue="color"
          onValueChange={(value) => setSelectedEffect(value)}
        >
          <TabsList>
            {Object.keys(effects).map((key) => (
              <TabsTrigger key={key} value={key}>
                {effects[key].label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Card>
            {Object.keys(effects).map((key) => (
              <TabsContent
                key={key}
                value={key}
                className="flex items-start flex-col"
              >
                <CardHeader>
                  <CardTitle>{effects[key].label}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  {effects[key].uiRenderer &&
                    effects[key].uiRenderer(
                      effectParams[key].params,
                      (updatedParams) => {
                        setEffectParams((prev) => ({
                          ...prev,
                          [key]: {
                            ...prev[key],
                            params: { ...prev[key].params, ...updatedParams },
                          },
                        }));
                      }
                    )}
                </CardContent>
              </TabsContent>
            ))}
          </Card>
        </Tabs>
      </div>
    </>
  );
};
