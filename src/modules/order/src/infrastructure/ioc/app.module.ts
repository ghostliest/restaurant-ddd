import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../config";
import { MealModule } from "./meal.module";
import { CartModule } from "./cart.module";
import { OrderModule } from "./order.module";
import { DatabaseModule } from "./database.module";

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: config.auth.jwtSecret,
        signOptions: {
          expiresIn: config.auth.jwtExpiryTime,
        },
      }),
      global: true,
    },
    DatabaseModule,
    MealModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
