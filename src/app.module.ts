import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from "@nestjs/axios";
import { TerminusModule } from "@nestjs/terminus";
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { SignalModule } from './signal/signal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/iot'),
    TerminusModule,
    HttpModule,
    SignalModule,
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService,

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
