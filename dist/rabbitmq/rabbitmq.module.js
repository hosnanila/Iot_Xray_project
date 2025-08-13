"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rabbitmq_service_1 = require("./rabbitmq.service");
const rabbitmq_consumer_1 = require("./rabbitmq.consumer");
const signal_module_1 = require("../signal/signal.module");
let RabbitMQModule = class RabbitMQModule {
};
exports.RabbitMQModule = RabbitMQModule;
exports.RabbitMQModule = RabbitMQModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'RABBITMQ_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URLS],
                        queue: process.env.QUEUE_NAME,
                        queueOptions: { durable: true },
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => signal_module_1.SignalModule),
        ],
        providers: [rabbitmq_service_1.RabbitMQService, rabbitmq_consumer_1.RabbitMQConsumer],
        exports: [rabbitmq_service_1.RabbitMQService, rabbitmq_consumer_1.RabbitMQConsumer],
    })
], RabbitMQModule);
//# sourceMappingURL=rabbitmq.module.js.map