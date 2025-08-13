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
var SignalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const signal_1 = require("../entity/signal");
let SignalService = SignalService_1 = class SignalService {
    constructor(signalModel) {
        this.signalModel = signalModel;
        this.logger = new common_1.Logger(SignalService_1.name);
    }
    async processAndSaveXray(deviceId, payload) {
        try {
            const { data, time } = payload;
            if (!Array.isArray(data) || data.length === 0) {
                this.logger.warn(`No data for device ${deviceId}`);
                return;
            }
            const dataLength = data.length;
            const dataVolume = data.reduce((sum, [, coords]) => sum + coords[2], 0);
            const signal = new this.signalModel({
                deviceId,
                time,
                dataLength,
                dataVolume,
                rawData: data,
            });
            await signal.save();
            this.logger.log(`Signal saved for device ${deviceId}`);
        }
        catch (err) {
            this.logger.error(`Error processing x-ray for device ${deviceId}: ${err.message}`);
        }
    }
    async findAll() {
        return this.signalModel.find().exec();
    }
    async filterByQuery(deviceId) {
        const filter = {};
        if (deviceId) {
            filter.deviceId = deviceId;
        }
        return this.signalModel.find(filter).exec();
    }
    async findOne(id) {
        return this.signalModel.findById(id).exec();
    }
    async update(id, data) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid MongoDB ObjectId');
        }
        const [deviceId, entry] = Object.entries(data)[0];
        const mappedData = {
            deviceId,
            time: entry.time,
            rawData: entry.data,
            dataLength: entry.data.length,
            dataVolume: this.calculateDataVolume(entry.data),
        };
        const updated = await this.signalModel.findByIdAndUpdate(id, { $set: mappedData }, { new: true, runValidators: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Signal with id ${id} not found`);
        }
        return updated;
    }
    calculateDataVolume(data) {
        return data.reduce((sum, item) => sum + (item[1]?.length || 0), 0) / 1024;
    }
    async remove(id) {
        return this.signalModel.findByIdAndDelete(id).exec();
    }
};
exports.SignalService = SignalService;
exports.SignalService = SignalService = SignalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(signal_1.Signal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SignalService);
//# sourceMappingURL=signal.service.js.map