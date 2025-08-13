import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { SignalModule } from '../signal/signal.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URLS || 'amqp://guest:guest@localhost:5672'],
          queue: process.env.QUEUE_NAME || 'xray',
          queueOptions: { durable: true },
        },
      },
    ]),
    forwardRef(() => SignalModule), 
  ],
  providers: [RabbitMQService, RabbitMQConsumer],
  exports: [RabbitMQService, RabbitMQConsumer],
})
export class RabbitMQModule {}
