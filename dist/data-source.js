"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const xray_data_entity_1 = require("./entity/xray-data.entity");
const datasets_1 = require("./entity/datasets");
let TypeOrmConfigModule = class TypeOrmConfigModule {
};
exports.TypeOrmConfigModule = TypeOrmConfigModule;
exports.TypeOrmConfigModule = TypeOrmConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: +process.env.DB_PORT,
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    schema: process.env.DB_SCHEMA,
                    synchronize: true,
                    logging: false,
                    entities: [xray_data_entity_1.XrayData, datasets_1.Dataset],
                    migrations: [],
                    subscribers: [],
                    ssl: false,
                    extra: {
                        max: 50,
                        min: 10
                    }
                }),
            }),
        ],
        exports: [typeorm_1.TypeOrmModule
        ],
    })
], TypeOrmConfigModule);
//# sourceMappingURL=data-source.js.map