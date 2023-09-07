import { IntegrationEvents } from "@/core/application";
import { config } from "infrastructure/config";

export const integrationEvents = IntegrationEvents.create({
  url: config.rabbit.url,
  queue: config.rabbit.queueName,
});
