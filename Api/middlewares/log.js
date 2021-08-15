const { createLogger, format, transports } = require("winston");

const { combine, timestamp, simple, printf } = format;
const chalk = require("chalk");
const { get } = require("node-emoji");

const dataAgora = () => {
  return new Date();
};

const consoleFormat = printf(({ level, message }) => {
  if (level === "error")
    return chalk` ${get("red_circle")}  {red ERROR}  ${message}`;
  if (level === "info")
    return chalk` ${get("large_purple_circle")}  {green INFO}  ${message}`;
  return chalk` ${get("no_entry")}  {cyan ${level}}  ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: dataAgora }), simple()),
  transports: [
    new transports.Console({
      colorize: true,
      format: consoleFormat,
    }),
    new transports.File({
      filename: "./logs/LogApi.log",
      maxSize: "25m",
      maxFiles: "7d",
      eol: "\r\n",
    }),
  ],
});

module.exports = { logger };
