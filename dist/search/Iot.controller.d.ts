import { IotService } from './Iot.service';
import { XRayDataDto } from '../DTO/serviceReport';
export declare class IotController {
    private readonly iotService;
    constructor(iotService: IotService);
    receiveXrayData(xRayDataDto: XRayDataDto): Promise<{
        status: string;
        message: string;
    } | {
        status: string;
        message?: undefined;
    }>;
}
