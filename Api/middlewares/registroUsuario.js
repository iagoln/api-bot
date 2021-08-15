const {logger} = require("./log");

const LogIpHoraMiddleware = (req, res, next) => {
  let linha = `${req.ip} | ${req.url}`;
  logger.info(linha);
  next();
};

module.exports = LogIpHoraMiddleware;
