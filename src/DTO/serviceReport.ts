import { IsArray } from 'class-validator';

export class XRayEntry {
  @IsArray()
  data: [number, [number, number, number]][];
}

export type XRayDataDto = Record<string, XRayEntry>;
