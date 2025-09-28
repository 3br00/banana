import { LightingStyle, CameraPerspective } from './types';

export const LIGHTING_STYLES: { value: LightingStyle; labelKey: string }[] = [
  { value: 'Natural Light', labelKey: 'lightingOptions.natural' },
  { value: 'Studio Light', labelKey: 'lightingOptions.studio' },
  { value: 'Golden Hour', labelKey: 'lightingOptions.goldenHour' },
  { value: 'Blue Hour', labelKey: 'lightingOptions.blueHour' },
  { value: 'Cinematic', labelKey: 'lightingOptions.cinematic' },
  { value: 'Dramatic', labelKey: 'lightingOptions.dramatic' },
];

export const CAMERA_PERSPECTIVES: { value: CameraPerspective; labelKey: string }[] = [
  { value: 'Front View', labelKey: 'perspectiveOptions.front' },
  { value: 'Top View', labelKey: 'perspectiveOptions.top' },
  { value: 'Side View', labelKey: 'perspectiveOptions.side' },
  { value: '45° Angle', labelKey: 'perspectiveOptions.angle45' },
  { value: 'Close-up', labelKey: 'perspectiveOptions.closeup' },
  { value: 'Macro Shot', labelKey: 'perspectiveOptions.macro' },
];