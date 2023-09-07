import { ClientRMQ } from "@nestjs/microservices";

interface ICreateConfig {
  url: string;
  queue: string;
}

export class IntegrationEvents {
  private _url: string;
  private _subscribersService: ClientRMQ;

  private constructor(service: ClientRMQ, url: string) {
    this._subscribersService = service;
    this._url = url;
    this.connect();
  }

  public static create(config: ICreateConfig) {
    const client = new ClientRMQ({
      urls: [`${config.url}`],
      queue: config.queue,
      // noAck: false,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    });

    return new IntegrationEvents(client!, config.url);
  }

  private async connect() {
    try {
      await this._subscribersService.connect();
      console.log(`Connected to RabbitMQ: ${this._url}`);
    } catch (error) {
      console.error("IntegrationEvents error:", error);
      process.exit(1);
    }
  }

  // public sendMessage(pattern: string, data: { [key: string]: any }) {
  //   return this._subscribersService.send({ cmd: pattern }, data);
  // }

  public sendEvent<T>(eventName: string, data: T) {
    return this._subscribersService.emit(eventName, data);
  }
}
