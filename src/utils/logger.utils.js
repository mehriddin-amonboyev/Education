import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.prettyPrint({ colorize: true }),
        winston.format.json({ space: 4 })),
    transports: [
        new winston.transports.File({
            filename: "./logs/error-logs.json",
            level: "error"
        }),
        new winston.transports.File({
            filename: "./logs/warn-logs.json",
            level: "warn"
        }),
        new winston.transports.File({
            filename: "./logs/info-logs.json",
            level: "info"
        }),
        new winston.transports.File({
            filename: "./logs/combined-logs.json"
        }),
    ],
});

export default logger;