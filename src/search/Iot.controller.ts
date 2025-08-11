import { Controller, Post, Body } from '@nestjs/common';
import { IotService } from './Iot.service';
import { XRayDataDto } from '../DTO/serviceReport';

@Controller('iot')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post('xray')
  async receiveXrayData(@Body() xRayDataDto: XRayDataDto) {
    try {
      const datasetId = Object.keys(xRayDataDto)[0];
      const data = xRayDataDto[datasetId]?.data;


      if (!data) {
        return { status: 'error', message: 'No data found' };
      }


      await this.iotService.processXrayData(datasetId, data);
      

      return { status: 'success' };
    } catch (error) {
      console.error('Error processing Xray data:', error);
      return { status: 'error', message: 'Internal server error' };
    }
  }
}
