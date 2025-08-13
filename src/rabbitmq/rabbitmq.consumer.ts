import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { SignalService } from '../signal/signal.service';

@Injectable()
export class RabbitMQConsumer implements OnApplicationBootstrap {
  private readonly logger = new Logger(RabbitMQConsumer.name);

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly signalService: SignalService,
  ) {}

  async onApplicationBootstrap() {
    await this.rabbitMQService.connect();

    await this.rabbitMQService.consume(process.env.QUEUE_NAME || 'xray', async (msg) => {
      this.logger.log(`Received message from ${process.env.QUEUE_NAME}: ${msg.toString()}`);

      try {
        const payload = JSON.parse(msg.toString());
        for (const [deviceId, entry] of Object.entries(payload)) {
          await this.signalService.processAndSaveXray(deviceId, entry);
        }
      } catch (error) {
        this.logger.error('Error in consumer:', error);
      }
    });

    this.logger.log('RabbitMQ Consumer is running');
  }
}
