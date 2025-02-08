import { ReactNode } from "react";
import { fireEffectUiRenderer, updateFireEffect } from "./fire";
import { gradientUiRenderer, updateGradient } from "./gradient";
import { imageUiRenderer, updateImage } from "./image";
import { snowEffectUiRenderer, updateSnowEffect } from "./snow";
import { solidColorUiRenderer, updateSolidColor } from "./solid-color";

export type EffectUpdateCanvas<T extends object> = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  params: T
) => (() => void) | void;

export type EffectUiRenderer<T extends object> = (
  effectParams: T,
  setEffectParams: React.Dispatch<React.SetStateAction<Partial<T>>>
) => ReactNode;

export const effects = {
  color: {
    label: "Couleur",
    params: { color: "#000000" },
    updateCanvas: updateSolidColor,
    uiRenderer: solidColorUiRenderer,
  },
  gradient: {
    label: "Dégradé",
    params: { color1: "#a1c4fd", color2: "#c2e9fb" },
    updateCanvas: updateGradient,
    uiRenderer: gradientUiRenderer,
  },
  image: {
    label: "Image",
    params: { image: "" },
    updateCanvas: updateImage,
    uiRenderer: imageUiRenderer,
  },
  snow: {
    label: "Neige",
    params: {
      count: 50,
      speed: 50,
      size: 50,
      backgroundColor: "#000000",
      snowflakeColor: "#ffffff",
    },
    updateCanvas: updateSnowEffect,
    uiRenderer: snowEffectUiRenderer,
  },
  fire: {
    label: "Feu",
    params: {
      speed: 50,
      height: 50,
    },
    updateCanvas: updateFireEffect,
    uiRenderer: fireEffectUiRenderer,
  },
} as Record<
  string,
  {
    label: string;
    params: object;
    updateCanvas: EffectUpdateCanvas<object>;
    uiRenderer?: EffectUiRenderer<object>;
  }
>;
