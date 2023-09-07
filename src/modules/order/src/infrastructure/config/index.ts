import "dotenv/config";

const {
  PORT,
  GLOBAL_PREFIX,
  SWAGGER_PATH,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
} = process.env;

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
  swaggerPath: `${GLOBAL_PREFIX}/${SWAGGER_PATH}`,
  rabbit,
  auth,
};

Object.freeze(config);

export { config };
