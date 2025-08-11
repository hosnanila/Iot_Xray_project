"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotModule = void 0;
const common_1 = require("@nestjs/common");
const Iot_service_1 = require("./Iot.service");
const Iot_controller_1 = require("./Iot.controller");
const rabbitmq_module_1 = require("../rabbitmq.module");
const typeorm_1 = require("@nestjs/typeorm");
const xray_data_entity_1 = require("../entity/xray-data.entity");
const datasets_1 = require("../entity/datasets");
let IotModule = class IotModule {
};
exports.IotModule = IotModule;
exports.IotModule = IotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            rabbitmq_module_1.RabbitMQModule,
            typeorm_1.TypeOrmModule.forFeature([xray_data_entity_1.XrayData, datasets_1.Dataset]),
        ],
        controllers: [Iot_controller_1.IotController],
        providers: [Iot_service_1.IotService],
        exports: [Iot_service_1.IotService],
    })
], IotModule);
//# sourceMappingURL=Iot.module.js.map