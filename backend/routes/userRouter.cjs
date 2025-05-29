const express = require("express");

const userRouter = express.Router();
const users = [
  {
    name: "Ian Hobbs",
    id: "E5A9B0DC-BEA9-34CE-583F-BFB9F6E2CE82",
  },
  {
    name: "Lynn Williamson",
    id: "AAA7DE12-7E8D-D26B-4516-A17655A913EB",
  },
  {
    name: "India Chambers",
    id: "65B461F7-9940-35DA-A4DA-0C0F0C264849",
  },
  {
    name: "Ava Clay",
    id: "7AC9310E-FB24-90BE-BA7A-7822B257A7D8",
  },
  {
    name: "Lucius Cooley",
    id: "D6E45CB5-5528-8180-3F18-7EEB508B30E3",
  },
];

userRouter.get("/", (req, resp) => {
  // console.log("router code");
  resp.json(users);
});
module.exports = userRouter;
