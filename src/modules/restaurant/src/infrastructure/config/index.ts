import "dotenv/config";
import { checkEnv } from "@/core/utils";

const {
  PORT,
  GLOBAL_PREFIX,
  DATABASE_URL,
  SWAGGER_PATH,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
} = process.env;

checkEnv({
  PORT,
  GLOBAL_PREFIX,
  DATABASE_URL,
  SWAGGER_PATH,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
});

const auth = {
  jwtSecret: JWT_SECRET,
  jwtExpiryTime: Number(JWT_EXPIRY_TIME),
};

const rabbit = {
  url: String(RABBITMQ_URL),
  queueName: String(RABBITMQ_QUEUE_NAME),
};

const config = {
  port: Number(PORT),
  globalPrefix: String(GLOBAL_PREFIX),
  databaseUrl: String(DATABASE_URL),
  swaggerPath: `${GLOBAL_PREFIX}/${SWAGGER_PATH}`,
  rabbit,
  auth,
};

Object.freeze(config);

export { config };
