import { NestFactory } from "@nestjs/core";
import { INestMicroservice } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { config } from "infrastructure/config";
import { AppModule } from "infrastructure/ioc/app.module";
import { DATABASE } from "infrastructure/ioc/database.module";
import { PrismaService } from "infrastructure/database/prisma/prisma";

class Main {
  private readonly _app: INestMicroservice;

  private constructor(app: INestMicroservice) {
    this._app = app;
    this.prismaLog();
    this.listen();
  }

  public static async start() {
    return new Main(
      await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
          urls: [`${config.RABBIT_URL}`],
          queue: config.RABBITMQ_QUEUE_NAME,
          persistent: true,
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      })
    );
  }

  private async listen() {
    await this._app.listen();
  }

  private prismaLog() {
    const prismaService: PrismaService = this._app.get(DATABASE);
    prismaService.$on("query" as any, (e: any) => {
      console.log({
        "Timestamp: ": e.timestamp,
        "Query: ": e.query,
        "Params: ": e.params,
        "Duration: ": e.duration + "ms",
      });
    });
  }
}

Main.start();
