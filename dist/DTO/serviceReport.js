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
exports.SaveSignalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DataEntry {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23739 }),
    __metadata("design:type", Number)
], DataEntry.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number], example: [51.33986133333333, 12.338946833333333, 1.131572] }),
    __metadata("design:type", Array)
], DataEntry.prototype, "location", void 0);
class Payload {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [[Number]], example: [
            [23739, [51.33986133333333, 12.338946833333333, 1.131572]],
            [24740, [51.3398665, 12.338945333333333, 2.11128]]
        ] }),
    __metadata("design:type", Array)
], Payload.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1735683480000 }),
    __metadata("design:type", Number)
], Payload.prototype, "time", void 0);
class SaveSignalDto {
}
exports.SaveSignalDto = SaveSignalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12334333333333333' }),
    __metadata("design:type", String)
], SaveSignalDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Payload)
], SaveSignalDto.prototype, "payload", void 0);
//# sourceMappingURL=serviceReport.js.map