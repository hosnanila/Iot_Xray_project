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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataset = void 0;
const typeorm_1 = require("typeorm");
const xray_data_entity_1 = require("./xray-data.entity");
let Dataset = class Dataset {
};
exports.Dataset = Dataset;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Dataset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Dataset.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => xray_data_entity_1.XrayData, (xrayData) => xrayData.dataset),
    __metadata("design:type", Array)
], Dataset.prototype, "xrayData", void 0);
exports.Dataset = Dataset = __decorate([
    (0, typeorm_1.Entity)('datasets')
], Dataset);
//# sourceMappingURL=datasets.js.map