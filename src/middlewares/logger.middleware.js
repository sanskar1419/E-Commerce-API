import fs from "fs";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, prettyPrint } = format;
// import {} from "winston.";

const fsPromise = fs.promises;

export const logger = createLogger({
  format: combine(
    label({ label: "Data is being stored here" }),
    timestamp(),
    prettyPrint()
  ),
  defaultMeta: { service: "Request-Logging" },
  transports: [
    new transports.File({ filename: "logs.txt", level: "info" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

const loggerMiddleware = async (req, res, next) => {
  // 1. Log request body.
  if (!req.url.includes("sign-in")) {
    const logData = JSON.stringify(req.body);
    await logger.log({
      level: "info",
      Request_Body: logData,
      Request_URL: req.url,
    });
  }
  next();
};

export default loggerMiddleware;
