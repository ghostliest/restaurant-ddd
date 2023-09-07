import type { Config } from "jest";

const config: Config = {
  verbose: true,
  rootDir: "./src",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/core/(.*)$": "<rootDir>/../../../core/src/$1",
    "^application/(.*)$": "<rootDir>/application/$1",
    "^domain/(.*)$": "<rootDir>/domain/$1",
    "^infrastructure/(.*)$": "<rootDir>/infrastructure/$1",
  },
};
export default config;
