import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

export const updateSoundVisualizer: EffectUpdateCanvas<{
  frequencyThreshold: number;
  scaleFactor: number;
}> = (canvasRef, params) => {
  if (!canvasRef?.current) return () => {};
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let audioContext: AudioContext;
  let analyser: AnalyserNode;
  let dataArray: Uint8Array;
  let source: MediaStreamAudioSourceNode;
  let animationFrameId: number;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.8;

    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / params.frequencyThreshold) * 2.5;
      let barHeight;
      const centerX = canvas.width / 2;

      for (let i = 0; i < params.frequencyThreshold; i++) {
        const index = params.frequencyThreshold - i - 1; // Inverser l'ordre des fréquences
        barHeight = (dataArray[index] * params.scaleFactor) / 50;
        ctx.fillStyle = `rgb(${barHeight + 100}, ${50 + barHeight / 2}, ${
          255 - barHeight
        })`;

        // Dessiner à gauche (basses)
        ctx.fillRect(
          centerX - index * (barWidth + 1),
          canvas.height - barHeight,
          barWidth,
          barHeight
        );
        // Dessiner à droite (miroir)
        ctx.fillRect(
          centerX + index * (barWidth + 1),
          canvas.height - barHeight,
          barWidth,
          barHeight
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();
  });

  return () => {
    cancelAnimationFrame(animationFrameId);
    audioContext?.close();
  };
};

export const soundVisualizerUiRenderer: EffectUiRenderer<{
  frequencyThreshold: number;
  scaleFactor: number;
}> = ({ frequencyThreshold, scaleFactor }, setEffectParams) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="frequencyThreshold">Fréquence seuil (Hz)</Label>
      <Slider
        id="frequencyThreshold"
        className="w-full"
        value={[frequencyThreshold]}
        min={20}
        max={2000}
        step={10}
        onValueChange={(val) => setEffectParams({ frequencyThreshold: val[0] })}
      />
    </div>
    <div>
      <Label htmlFor="scaleFactor">Facteur d'échelle</Label>
      <Slider
        id="scaleFactor"
        className="w-full"
        value={[scaleFactor]}
        min={1}
        max={50}
        step={1}
        onValueChange={(val) => setEffectParams({ scaleFactor: val[0] })}
      />
    </div>
  </div>
);
