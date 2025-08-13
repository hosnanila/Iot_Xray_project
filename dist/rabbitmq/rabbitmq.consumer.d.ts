import { OnApplicationBootstrap } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { SignalService } from '../signal/signal.service';
export declare class RabbitMQConsumer implements OnApplicationBootstrap {
    private readonly rabbitMQService;
    private readonly signalService;
    private readonly logger;
    constructor(rabbitMQService: RabbitMQService, signalService: SignalService);
    onApplicationBootstrap(): Promise<void>;
}
