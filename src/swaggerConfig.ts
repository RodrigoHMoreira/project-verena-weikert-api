import swaggerUi, { JsonObject } from "swagger-ui-express";
import { Express } from "express";
import fs from "fs";
import YAML from "js-yaml";

const swaggerFile = fs.readFileSync("src/swagger.yaml", "utf8");
const swaggerDocument: JsonObject = YAML.load(swaggerFile) as JsonObject;

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
