import winston from "winston";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logsDir, "combined.log") }),
    new winston.transports.Console(),
  ],
});

export default logger;