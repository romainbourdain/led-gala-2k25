import { create } from "zustand";

export type SettingsValue = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
};

export type SettingsStore = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  setX: (x: number) => void;
  setY: (y: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setRotate: (rotate: number) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  x: 65,
  y: 60,
  width: 104,
  height: 26,
  rotate: 90,
  setX: (x: number) => set((state) => ({ ...state, x })),
  setY: (y: number) => set((state) => ({ ...state, y })),
  setWidth: (width: number) => set((state) => ({ ...state, width })),
  setHeight: (height: number) => set((state) => ({ ...state, height })),
  setRotate: (rotate: number) => set((state) => ({ ...state, rotate })),
}));
