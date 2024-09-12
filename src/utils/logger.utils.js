import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.prettyPrint({ colorize: true }),
        winston.format.json({ space: 4 })),
    transports: [
        new winston.transports.File({
            level: "error",
            filename: "./logs/error-logs.json"
        }),
        new winston.transports.File({
            level: "warn",
            filename: "./logs/warn-logs.json"
        }),
        new winston.transports.File({
            level: "info",
            filename: "./logs/info-logs.json",
        }),
        new winston.transports.File({
            filename: "./logs/combined-logs.json"
        }),
    ],
});

export default logger;