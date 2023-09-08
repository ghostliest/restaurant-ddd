import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma";

export const DATABASE = Symbol("DATABASE");

@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: () => new PrismaService(),
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
