import { Module } from '@nestjs/common';
import { IotService } from './Iot.service';
import { IotController } from './Iot.controller';
import { RabbitMQModule } from '../rabbitmq.module';  
import { TypeOrmModule } from '@nestjs/typeorm';
import { XrayData } from '../entity/xray-data.entity';
import { Dataset } from '../entity/datasets';
@Module({
  imports: [
    RabbitMQModule, 
    TypeOrmModule.forFeature([XrayData, Dataset]),  
  ],
  controllers: [IotController],
  providers: [IotService],
  exports: [IotService],
})
export class IotModule {}
