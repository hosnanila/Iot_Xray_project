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
exports.XrayData = void 0;
const typeorm_1 = require("typeorm");
const datasets_1 = require("./datasets");
let XrayData = class XrayData {
};
exports.XrayData = XrayData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], XrayData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision'),
    __metadata("design:type", Number)
], XrayData.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision'),
    __metadata("design:type", Number)
], XrayData.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision'),
    __metadata("design:type", Number)
], XrayData.prototype, "intensity", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision'),
    __metadata("design:type", Number)
], XrayData.prototype, "averageIntensity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], XrayData.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => datasets_1.Dataset, (dataset) => dataset.xrayData, { nullable: false }),
    __metadata("design:type", datasets_1.Dataset)
], XrayData.prototype, "dataset", void 0);
exports.XrayData = XrayData = __decorate([
    (0, typeorm_1.Entity)('xray_data')
], XrayData);
//# sourceMappingURL=xray-data.entity.js.map