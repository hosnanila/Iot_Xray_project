"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var IotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const xray_data_entity_1 = require("../entity/xray-data.entity");
const datasets_1 = require("../entity/datasets");
const rabbitmq_service_1 = require("../rabbitmq.service");
let IotService = IotService_1 = class IotService {
    constructor(xrayRepository, datasetRepository, rabbitMQService) {
        this.xrayRepository = xrayRepository;
        this.datasetRepository = datasetRepository;
        this.rabbitMQService = rabbitMQService;
        this.logger = new common_1.Logger(IotService_1.name);
    }
    async processXrayData(datasetId, data) {
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
        }
        catch (error) {
            this.logger.error('Error in processXrayData:', error.stack);
            throw error;
        }
    }
};
exports.IotService = IotService;
exports.IotService = IotService = IotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(xray_data_entity_1.XrayData)),
    __param(1, (0, typeorm_1.InjectRepository)(datasets_1.Dataset)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        rabbitmq_service_1.RabbitMQService])
], IotService);
//# sourceMappingURL=Iot.service.js.map