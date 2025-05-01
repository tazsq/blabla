const express = require("express");
const routesRouter = express.Router();

// routesRouter.get("/", (req, resp) => {
//   resp.json(routes);
// });
// routesRouter.get("/", (req, res) => {
//   res.render("index", { message: "EJS rocks!" });
// });

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];

routesRouter.get("/", (req, res) => {
  res.render("index", { links: links });
});

const routes = [
  {
    id: "1",
    from: "mumbai",
    to: "pune",
  },
  {
    id: "2",
    from: "rajp",
    to: "mumbai",
  },
  {
    id: "3",
    from: "pune",
    to: "rajp",
  },
  {
    id: "dd8b",
    from: "nashik",
    to: "nagpur",
  },
  {
    id: "eba3",
    from: "nashik",
    to: "nagpur",
  },
];
module.exports = routesRouter;
