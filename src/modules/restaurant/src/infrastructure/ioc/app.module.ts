import { Module } from "@nestjs/common";
import { RestaurantModule } from "./restaurant.module";

@Module({
  imports: [RestaurantModule],
})
export class AppModule {}
