import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { config } from "infrastructure/config";

export const DATABASE_DI_TOKEN = Symbol("DATABASE_DI_TOKEN");

export const databaseProviders = [
  {
    provide: DATABASE_DI_TOKEN,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: config.db.host,
        port: config.db.port,
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        entities: [__dirname + "/../database/typeorm/entity/*.entity{.ts,.js}"],
        synchronize: true,
        logging: true,
      });

      return await dataSource.initialize();
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
