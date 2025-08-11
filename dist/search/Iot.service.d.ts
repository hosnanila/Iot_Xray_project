import { Repository } from 'typeorm';
import { XrayData } from '../entity/xray-data.entity';
import { Dataset } from '../entity/datasets';
import { RabbitMQService } from '../rabbitmq.service';
export declare class IotService {
    private readonly xrayRepository;
    private readonly datasetRepository;
    private readonly rabbitMQService;
    private readonly logger;
    constructor(xrayRepository: Repository<XrayData>, datasetRepository: Repository<Dataset>, rabbitMQService: RabbitMQService);
    processXrayData(datasetId: string, data: [number, [number, number, number]][]): Promise<void>;
}
