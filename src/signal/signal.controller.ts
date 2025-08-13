import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SignalService } from './signal.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { Signal } from 'src/entity/signal';
import { ApiBody } from '@nestjs/swagger';


@Controller('signal')
export class SignalController {
  constructor(
    private readonly signalService: SignalService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

   @Post('send-to-queue')
  @ApiBody({
    schema: {
      type: 'object',
      description: 'پیام برای ارسال به صف RabbitMQ',
      example: {
        example: {
        "689b64b0c1a1be2233d5e22f": {
          data: [
            [23739, [51.33986133333333, 12.338946833333333, 1.131572]],
            [24740, [51.3398665, 12.338945333333333, 2.11128]],
          ],
          time: 1735683480000,
        },
      }
      },
    },
  })
  async sendToQueue(@Body() body: any) {
    await this.rabbitMQService.sendMessage(process.env.QUEUE_NAME, body);
    return { message: `Message sent to ${process.env.QUEUE_NAME} queue` };
  }


@Post('save')
@ApiBody({
    schema: {
      type: 'object',
      description: 'ارسال مستقیم',
      example: {
        example: {
        "689b64b0c1a1be2233d5e22f": {
          data: [
            [23739, [51.33986133333333, 12.338946833333333, 1.131572]],
            [24740, [51.3398665, 12.338945333333333, 2.11128]],
          ],
          time: 1735683480000,
        },
      }
      },
    },
  })
  async saveSignal(
    @Body()
    body: Record<
      string,
      {
        data: [number, [number, number, number]][];
        time: number;
      }
    >,
  ) {
    const deviceId = Object.keys(body)[0];
    const payload = body[deviceId];
    const savedData = await this.signalService.processAndSaveXray(deviceId, payload);
    return {
      deviceId,
      savedData,
    };
  }

  @Get('All')
  findAll() {
    return this.signalService.findAll();
  }

  @Get('filter')
  filter(
    @Query('deviceId') deviceId?: string,
  ) {
    return this.signalService.filterByQuery(deviceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signalService.findOne(id);
  }

@Put(':id')
update(@Param('id') id: string, @Body() data: Partial<Signal>) {
  return this.signalService.update(id, data);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signalService.remove(id);
  }
}
