const path = require("path");

module.exports = {
  server: {
    port: 9898,
  },
  logger: {
    folder: path.join(__dirname, "../", "logs"),
  },
};
