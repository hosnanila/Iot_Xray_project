declare class Payload {
    data: [number, number[]][];
    time: number;
}
export declare class SaveSignalDto {
    deviceId: string;
    payload: Payload;
}
export {};
