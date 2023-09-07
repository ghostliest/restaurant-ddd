import { NestFactory } from "@nestjs/core";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "infrastructure/ioc/app.module";
import { DATABASE_DI_TOKEN } from "infrastructure/ioc/database.module";
import { PrismaService } from "infrastructure/database/prisma/prisma";
import { config } from "infrastructure/config";

class Main {
  private readonly _app: INestApplication<any>;

  private constructor(app: INestApplication<any>) {
    this._app = app;
    this.setup();
    this.swagger();
    this.prismaLog();
    this.listen();
  }

  public static async start() {
    return new Main(await NestFactory.create(AppModule));
  }

  private setup() {
    this._app.enableCors();
    this._app.setGlobalPrefix(config.globalPrefix);
    this._app.useGlobalPipes(new ValidationPipe());
  }

  private async listen() {
    await this._app.listen(config.port);
    await this._app.getUrl().then((url) => console.log(`server started: ${url}`));
  }

  private swagger() {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("restaurant-ddd (order)")
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(this._app, swaggerConfig);
    SwaggerModule.setup(config.swaggerPath, this._app, document);
  }

  private prismaLog() {
    const prismaService: PrismaService = this._app.get(DATABASE_DI_TOKEN);
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
