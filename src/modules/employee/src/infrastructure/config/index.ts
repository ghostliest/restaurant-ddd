import "dotenv/config";
import { checkEnv } from "@/core/utils";

const {
  PORT,
  GLOBAL_PREFIX,
  SWAGGER_PATH,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

checkEnv({
  PORT,
  GLOBAL_PREFIX,
  SWAGGER_PATH,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
});

const rabbit = {
  url: String(RABBITMQ_URL),
  queueName: String(RABBITMQ_QUEUE_NAME),
};

const db = {
  host: String(DB_HOST),
  port: Number(DB_PORT),
  username: String(DB_USERNAME),
  password: String(DB_PASSWORD),
  database: String(DB_NAME),
};

const config = {
  port: Number(PORT),
  globalPrefix: String(GLOBAL_PREFIX),
  swaggerPath: `${GLOBAL_PREFIX}/${SWAGGER_PATH}`,
  db,
  rabbit,
};

Object.freeze(config);

export { config };
