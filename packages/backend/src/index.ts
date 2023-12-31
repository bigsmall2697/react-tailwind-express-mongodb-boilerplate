import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import pino from "pino-http";
import { logger } from "./logger";
import checkTargetRouter from "./routers/check-target.router";

const MONGO_URL = process.env.MONGO_URL ?? "mongodb://localhost:27017";

dotenv.config();

async function main() {
  try {
    logger.info(`Running as app`);

    mongoose.connect(MONGO_URL);
    mongoose.connection.on("connected", () => {
      logger.info("Connected to mongodb");
    });

    mongoose.connection.on("error", (err) => {
      logger.error(err, "Mongodb connection error");
      process.exit(1);
    });

    const mongoClient = new MongoClient(MONGO_URL);
    await mongoClient.connect();

    const app = express();

    app.use(
      express.json({
        limit: "1mb",
      }),
    );

    app.use(cors());

    app.use(express.urlencoded({ limit: "1mb", extended: false }));

    app.use(
      pino({
        logger,
      }),
    );

    app.get("/health", (req, res) => {
      res.status(200).json({ healthy: true });
    });

    app.use("/check-target", checkTargetRouter);

    app.listen(process.env.PORT, () => {
      logger.info(`Backend server listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    logger.error(err, "Failed to start app");
  }
}

main();
