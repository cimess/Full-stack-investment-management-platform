import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize, splat } = format;

// Custom format for logs to include metadata (like Prisma objects)
const myFormat = printf(({ level, message, timestamp, ...meta }) => {
  let metaStr = "";
  if (Object.keys(meta).length) {
    metaStr = ` ${JSON.stringify(meta, null, 2)}`;
  }
  return `${timestamp} [${level}]: ${message}${metaStr}`;
});

// Create the logger
const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      // Only the console gets colors
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        myFormat
      )
    }),
    new transports.File({
      filename: 'winstonlog/app.log',
      // The file gets clean text (no ANSI codes)
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        myFormat
      )
    })
  ],
});

export default logger;
