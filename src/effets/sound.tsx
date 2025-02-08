import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { EffectUiRenderer, EffectUpdateCanvas } from "./effets";

export const updateSoundVisualizer: EffectUpdateCanvas<{
  sampleRate: number;
  maxFrequency: number;
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
    analyser.fftSize = params.sampleRate;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.8;

    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / params.maxFrequency) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < params.maxFrequency; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
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
  sampleRate: number;
  maxFrequency: number;
}> = ({ sampleRate, maxFrequency }, setEffectParams) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="sampleRate">Fréquence d'échantillonnage</Label>
      <Slider
        id="sampleRate"
        className="w-full"
        value={[sampleRate]}
        min={256}
        max={8192}
        step={256}
        onValueChange={(val) => setEffectParams({ sampleRate: val[0] })}
      />
    </div>
    <div>
      <Label htmlFor="maxFrequency">Fréquence max prise en compte</Label>
      <Slider
        id="maxFrequency"
        className="w-full"
        value={[maxFrequency]}
        min={50}
        max={2000}
        step={50}
        onValueChange={(val) => setEffectParams({ maxFrequency: val[0] })}
      />
    </div>
  </div>
);
