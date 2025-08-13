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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalController = void 0;
const common_1 = require("@nestjs/common");
const signal_service_1 = require("./signal.service");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
const swagger_1 = require("@nestjs/swagger");
const tupleSchema = {
    type: 'array',
    minItems: 2,
    maxItems: 2,
    items: [
        { type: 'integer' },
        {
            type: 'array',
            items: { type: 'number' },
            minItems: 3,
            maxItems: 3,
        },
    ],
};
let SignalController = class SignalController {
    constructor(signalService, rabbitMQService) {
        this.signalService = signalService;
        this.rabbitMQService = rabbitMQService;
    }
    async saveSignal(body) {
        const deviceId = Object.keys(body)[0];
        const payload = body[deviceId];
        const savedData = await this.signalService.processAndSaveXray(deviceId, payload);
        return {
            deviceId,
            savedData,
        };
    }
    async sendToQueue(body) {
        await this.rabbitMQService.sendMessage(process.env.QUEUE_NAME, body);
        return { message: `Message sent to ${process.env.QUEUE_NAME} queue` };
    }
    findAll() {
        return this.signalService.findAll();
    }
    filter(deviceId) {
        return this.signalService.filterByQuery(deviceId);
    }
    findOne(id) {
        return this.signalService.findOne(id);
    }
    update(id, data) {
        return this.signalService.update(id, data);
    }
    remove(id) {
        return this.signalService.remove(id);
    }
};
exports.SignalController = SignalController;
__decorate([
    (0, common_1.Post)('save'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            description: 'کلید داینامیک deviceId با مقدار شامل data و time',
            example: {
                "12334333333333333": {
                    data: [
                        [23739, [51.33986133333333, 12.338946833333333, 1.131572]],
                        [24740, [51.3398665, 12.338945333333333, 2.11128]],
                    ],
                    time: 1735683480000,
                },
            },
            additionalProperties: {
                type: 'object',
                properties: {
                    data: {
                        type: 'array',
                        items: tupleSchema,
                    },
                    time: { type: 'integer' },
                },
                required: ['data', 'time'],
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignalController.prototype, "saveSignal", null);
__decorate([
    (0, common_1.Post)('send-to-queue'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            description: 'پیام برای ارسال به صف RabbitMQ',
            example: {
                example: {
                    "12334333333333333": {
                        data: [
                            [23739, [51.33986133333333, 12.338946833333333, 1.131572]],
                            [24740, [51.3398665, 12.338945333333333, 2.11128]],
                        ],
                        time: 1735683480000,
                    },
                }
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignalController.prototype, "sendToQueue", null);
__decorate([
    (0, common_1.Get)('All'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SignalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignalController.prototype, "filter", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SignalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignalController.prototype, "remove", null);
exports.SignalController = SignalController = __decorate([
    (0, common_1.Controller)('signal'),
    __metadata("design:paramtypes", [signal_service_1.SignalService,
        rabbitmq_service_1.RabbitMQService])
], SignalController);
//# sourceMappingURL=signal.controller.js.map