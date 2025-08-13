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
var RabbitMQConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConsumer = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_service_1 = require("./rabbitmq.service");
const signal_service_1 = require("../signal/signal.service");
let RabbitMQConsumer = RabbitMQConsumer_1 = class RabbitMQConsumer {
    constructor(rabbitMQService, signalService) {
        this.rabbitMQService = rabbitMQService;
        this.signalService = signalService;
        this.logger = new common_1.Logger(RabbitMQConsumer_1.name);
    }
    async onApplicationBootstrap() {
        await this.rabbitMQService.connect();
        await this.rabbitMQService.consume(process.env.QUEUE_NAME, async (msg) => {
            this.logger.log(`Received message from ${process.env.QUEUE_NAME}: ${msg.toString()}`);
            try {
                const payload = JSON.parse(msg.toString());
                for (const [deviceId, entry] of Object.entries(payload)) {
                    await this.signalService.processAndSaveXray(deviceId, entry);
                }
            }
            catch (error) {
                this.logger.error('Error in consumer:', error);
            }
        });
        this.logger.log('RabbitMQ Consumer is running');
    }
};
exports.RabbitMQConsumer = RabbitMQConsumer;
exports.RabbitMQConsumer = RabbitMQConsumer = RabbitMQConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rabbitmq_service_1.RabbitMQService,
        signal_service_1.SignalService])
], RabbitMQConsumer);
//# sourceMappingURL=rabbitmq.consumer.js.map