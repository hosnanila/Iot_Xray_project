import { Dataset } from './datasets';
export declare class XrayData {
    id: string;
    latitude: number;
    longitude: number;
    intensity: number;
    averageIntensity: number;
    createdAt: Date;
    dataset: Dataset;
}
