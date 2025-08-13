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
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { Signal } from '../entity/signal';
export declare class SignalService {
    private readonly signalModel;
    private readonly logger;
    constructor(signalModel: Model<Signal>);
    processAndSaveXray(deviceId: string, payload: any): Promise<void>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    filterByQuery(deviceId?: string): Promise<(import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    private calculateDataVolume;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Signal, {}, {}> & Signal & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
