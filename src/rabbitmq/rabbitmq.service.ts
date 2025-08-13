import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnApplicationShutdown {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect() {
    if (this.channel) {
      return this.logger.warn('RabbitMQ already connected');
    }

    try {
      this.logger.log('Connecting to RabbitMQ');
      this.connection = await amqp.connect(process.env.RABBITMQ_URLS || 'amqp://guest:guest@localhost:5672');
      this.channel = await this.connection.createChannel();
      this.logger.log('Connected to RabbitMQ');

      this.connection.on('close', () => {
        this.logger.error('RabbitMQ connection closed. Reconnecting');
        this.reconnect();
      });

      this.connection.on('error', (err) => {
        this.logger.error('RabbitMQ connection error:', err);
      });
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      setTimeout(() => this.connect(), 5000);
    }
  }

  async consume(queue: string, callback: (msg: Buffer) => Promise<void>) {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, async (message) => {
      if (message) {
        try {
          await callback(message.content);
          this.channel.ack(message);
        } catch (err) {
          this.logger.error(`Error processing message from ${queue}`, err);
          this.channel.nack(message, false, false);
        }
      }
    });

    this.logger.log(`Consuming from queue: ${queue}`);
  }

  async sendMessage(queue: string, message: any) {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    await this.channel.assertQueue(queue, { durable: true });
    const buffer = Buffer.from(
      typeof message === 'string' ? message : JSON.stringify(message),
    );

    this.channel.sendToQueue(queue, buffer);
    this.logger.log(`Sent message to ${queue}: ${buffer.toString()}`);
  }

  private async reconnect() {
    this.channel = null;
    this.connection = null;
    await this.connect();
  }

  async onApplicationShutdown(signal?: string) {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    this.logger.log('RabbitMQ connection closed on app shutdown');
  }
}
