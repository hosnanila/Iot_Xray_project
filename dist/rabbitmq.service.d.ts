import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQService {
    private readonly client;
    constructor(client: ClientProxy);
    sendMessage(pattern: string, data: any): Promise<any>;
    sendXrayData(data: any): Promise<any>;
}
