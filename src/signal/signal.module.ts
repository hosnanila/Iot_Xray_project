import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';  
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from '../entity/signal';
@Module({
  imports: [
    RabbitMQModule, 
     MongooseModule.forFeature([
       { name: Signal.name, schema: SignalSchema }
     ])

  ],
  controllers: [SignalController],
  providers: [SignalService],
  exports: [SignalService],
})
export class SignalModule {}

