import { createLogger, format, transports } from 'winston';


const { combine, timestamp, printf, colorize, splat } = format;

const myFormat = printf(({ level, message, timestamp, ...meta }) => {
  let metaStr = "";
  if (Object.keys(meta).length) {
      metaStr = ` ${JSON.stringify(meta, null, 2)}`;
  }
  return `${timestamp} [${level}]: ${message}${metaStr}`;
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: combine(colorize({ all: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), splat(), myFormat)
    }),
    new transports.File({
      filename: 'winstonlog/app.log',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), splat(), myFormat)
    }),
  
  ],
});

export default logger;
