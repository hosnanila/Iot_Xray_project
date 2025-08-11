import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XrayData } from '../entity/xray-data.entity';
import { Dataset } from '../entity/datasets';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class IotService {
  private readonly logger = new Logger(IotService.name);

  constructor(
    @InjectRepository(XrayData)
    private readonly xrayRepository: Repository<XrayData>,

    @InjectRepository(Dataset)
    private readonly datasetRepository: Repository<Dataset>,

    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async processXrayData(
    datasetId: string,
    data: [number, [number, number, number]][]
  ): Promise<void> {
    try {
      if (!data || data.length === 0) {
        this.logger.warn('No Xray data received.');
        return;
      }

      let dataset = await this.datasetRepository.findOne({ where: { id: datasetId } });
      if (!dataset) {
        dataset = this.datasetRepository.create({ id: datasetId });
        await this.datasetRepository.save(dataset);
      }

      const intensities = data.map(([, value]) => value[2]);
      const avgIntensity = intensities.reduce((acc, val) => acc + val, 0) / intensities.length;

      for (const [, value] of data) {
        const xray = this.xrayRepository.create();
        xray.latitude = value[0];
        xray.longitude = value[1];
        xray.intensity = value[2];
        xray.averageIntensity = avgIntensity;
        xray.dataset = dataset;
        await this.xrayRepository.save(xray);
      }
      await this.rabbitMQService.sendMessage('xray_processed', {
        avgIntensity,
        count: data.length,
      });

      this.logger.log(`Xray data processed for dataset ${datasetId}. میانگین Intensity: ${avgIntensity}`);
    } catch (error) {
      this.logger.error('Error in processXrayData:', error.stack);
      throw error;
    }
  }
}
