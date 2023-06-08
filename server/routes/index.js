const accountRoute = require("./accountRoute");
const itemRoute = require("./itemRoute");

const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Take Home Test ReactJS",
  });
});

routes.use("/accounts", accountRoute);
routes.use("/items", itemRoute);

module.exports = routes;
