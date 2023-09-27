import mongoose from "mongoose";
import { config } from "infrastructure/config";

export const dbConnect = async () => {
  mongoose
    .connect(config.databaseUrl)
    .then((r) => {
      const db = r.connection;
      console.log(`DB connected: ${db.host}:${db.port}/${db.name}`);
    })
    .catch(() => {
      throw new Error("DB connection fail");
    });
};
