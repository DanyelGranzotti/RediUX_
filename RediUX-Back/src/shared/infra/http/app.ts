import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "../../../data-source";
import "../../container/index";
import { routes } from "./routes";
import { AppError } from "../../erros/AppError";
import SwaggerFile from "../../../swagger.json";
const app = express();

AppDataSource.initialize().then(() => {
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerFile));
  app.use(routes);
  app.use(
    // eslint-disable-next-line
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
      });
    },
  );
});

export { app };
