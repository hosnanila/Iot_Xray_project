import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types  } from 'mongoose';
import { Signal } from '../entity/signal';

@Injectable()
export class SignalService {
  private readonly logger = new Logger(SignalService.name);

  constructor(
    @InjectModel(Signal.name) private readonly signalModel: Model<Signal>,
  ) {}

  async processAndSaveXray(deviceId: string, payload: any) {
    try {
      const { data, time } = payload;
      
      if (!Array.isArray(data) || data.length === 0) {
        this.logger.warn(`No data for device ${deviceId}`);
        return;
      }

      const dataLength = data.length;
      const dataVolume = data.reduce((sum, [, coords]) => sum + coords[2], 0);

      const signal = new this.signalModel({
        deviceId,
        time,
        dataLength,
        dataVolume,
        rawData: data,
      });

      await signal.save();
      this.logger.log(`Signal saved for device ${deviceId}`);
    } catch (err) {
      this.logger.error(`Error processing x-ray for device ${deviceId}: ${err.message}`);
    }
  }

  async findAll() {
    return this.signalModel.find().exec();
  }


  async filterByQuery(deviceId?: string) {
    const filter: any = {};

    if (deviceId) {
      filter.deviceId = deviceId;
    }

    return this.signalModel.find(filter).exec();
  }


  async findOne(id: string) {
    return this.signalModel.findById(id).exec();
  }


 async update(id: string, data: any) {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Invalid MongoDB ObjectId');
  }

  const [deviceId, entry] = Object.entries(data)[0] as [string, any];

  const mappedData = {
    deviceId,
    time: entry.time,
    rawData: entry.data,
    dataLength: entry.data.length,
    dataVolume: this.calculateDataVolume(entry.data), 
  };

  const updated = await this.signalModel.findByIdAndUpdate(
    id,
    { $set: mappedData },
    { new: true, runValidators: true }
  ).exec();

  if (!updated) {
    throw new NotFoundException(`Signal with id ${id} not found`);
  }

  return updated;
}


private calculateDataVolume(data: any[]): number {
  return data.reduce((sum, item) => sum + (item[1]?.length || 0), 0) / 1024;
}

  async remove(id: string) {
    return this.signalModel.findByIdAndDelete(id).exec();
  }
}

