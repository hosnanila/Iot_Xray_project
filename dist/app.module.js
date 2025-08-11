"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const axios_1 = require("@nestjs/axios");
const terminus_1 = require("@nestjs/terminus");
const app_service_1 = require("./app.service");
const data_source_1 = require("./data-source");
const Iot_module_1 = require("./search/Iot.module");
const rabbitmq_module_1 = require("./rabbitmq.module");
let AppModule = class AppModule {
    configure(consumer) {
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            data_source_1.TypeOrmConfigModule,
            terminus_1.TerminusModule,
            axios_1.HttpModule,
            Iot_module_1.IotModule,
            rabbitmq_module_1.RabbitMQModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map