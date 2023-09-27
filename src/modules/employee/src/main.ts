import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "infrastructure/ioc/app.module";
import { config } from "infrastructure/config";

class Main {
  private readonly _app: INestApplication<any>;

  private constructor(app: INestApplication<any>) {
    this._app = app;
    this.setup();
    this.swagger();
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
      .setTitle("restaurant-ddd (employee)")
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(this._app, swaggerConfig);
    SwaggerModule.setup(config.swaggerPath, this._app, document);
  }
}

Main.start();
