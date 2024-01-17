import fs from "fs";
import winston from "winston";

const fsPromise = fs.promises;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Request-Logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  // 1. Log request body.
  if (!req.url.includes("sign-in")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    await logger.info(logData);
  }
  next();
};
export default loggerMiddleware;
