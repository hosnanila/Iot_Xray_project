// xray.consumer.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class XrayConsumer {
  private readonly logger = new Logger(XrayConsumer.name);

  @MessagePattern('xray_processed')
  handleXrayProcessed(@Payload() data: any) {
    this.logger.log(`Received from RabbitMQ: ${JSON.stringify(data)}`);
  }
}
