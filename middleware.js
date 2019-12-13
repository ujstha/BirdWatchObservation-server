const cors = require("cors");

const middleware = (express, app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

module.exports = middleware;
