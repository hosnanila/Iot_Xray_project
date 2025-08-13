"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var RabbitMQService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
const amqp = __importStar(require("amqplib"));
let RabbitMQService = RabbitMQService_1 = class RabbitMQService {
    constructor() {
        this.logger = new common_1.Logger(RabbitMQService_1.name);
    }
    async connect() {
        if (this.channel) {
            return this.logger.warn('RabbitMQ already connected');
        }
        try {
            this.logger.log('Connecting to RabbitMQ');
            this.connection = await amqp.connect(process.env.RABBITMQ_URLS);
            this.channel = await this.connection.createChannel();
            this.logger.log('Connected to RabbitMQ');
            this.connection.on('close', () => {
                this.logger.error('RabbitMQ connection closed. Reconnecting');
                this.reconnect();
            });
            this.connection.on('error', (err) => {
                this.logger.error('RabbitMQ connection error:', err);
            });
        }
        catch (error) {
            this.logger.error('Failed to connect to RabbitMQ', error);
            setTimeout(() => this.connect(), 5000);
        }
    }
    async consume(queue, callback) {
        if (!this.channel) {
            throw new Error('Channel not initialized');
        }
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, async (message) => {
            if (message) {
                try {
                    await callback(message.content);
                    this.channel.ack(message);
                }
                catch (err) {
                    this.logger.error(`Error processing message from ${queue}`, err);
                    this.channel.nack(message, false, false);
                }
            }
        });
        this.logger.log(`Consuming from queue: ${queue}`);
    }
    async sendMessage(queue, message) {
        if (!this.channel) {
            throw new Error('Channel not initialized');
        }
        await this.channel.assertQueue(queue, { durable: true });
        const buffer = Buffer.from(typeof message === 'string' ? message : JSON.stringify(message));
        this.channel.sendToQueue(queue, buffer);
        this.logger.log(`Sent message to ${queue}: ${buffer.toString()}`);
    }
    async reconnect() {
        this.channel = null;
        this.connection = null;
        await this.connect();
    }
    async onApplicationShutdown(signal) {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
        this.logger.log('RabbitMQ connection closed on app shutdown');
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = RabbitMQService_1 = __decorate([
    (0, common_1.Injectable)()
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map