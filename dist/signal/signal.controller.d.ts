/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { SignalService } from './signal.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { Signal } from 'src/entity/signal';
export declare class SignalController {
    private readonly signalService;
    private readonly rabbitMQService;
    constructor(signalService: SignalService, rabbitMQService: RabbitMQService);
    saveSignal(body: Record<string, {
        data: [number, [number, number, number]][];
        time: number;
    }>): Promise<{
        deviceId: string;
        savedData: void;
    }>;
    sendToQueue(body: any): Promise<{
        message: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    filter(deviceId?: string): Promise<(import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, data: Partial<Signal>): Promise<import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
