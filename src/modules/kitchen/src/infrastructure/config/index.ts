import "dotenv/config";

const { PORT, RABBIT_URL, RABBITMQ_QUEUE_NAME } = process.env;

const config = {
  port: Number(PORT),
  RABBIT_URL,
  RABBITMQ_QUEUE_NAME,
};

Object.freeze(config);

export { config };
