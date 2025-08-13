/// <reference types="node" />
import { OnApplicationShutdown } from '@nestjs/common';
export declare class RabbitMQService implements OnApplicationShutdown {
    private readonly logger;
    private connection;
    private channel;
    connect(): Promise<void>;
    consume(queue: string, callback: (msg: Buffer) => Promise<void>): Promise<void>;
    sendMessage(queue: string, message: any): Promise<void>;
    private reconnect;
    onApplicationShutdown(signal?: string): Promise<void>;
}
