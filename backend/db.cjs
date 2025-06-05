// db.js

// const authors = [
//   { id: 1, name: "Bryan" },
//   { id: 2, name: "Christian" },
//   { id: 3, name: "Jason" },
// ];
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
async function getAuthorById(authorId) {
  return authors.find((author) => author.id === authorId);
}

async function getRoutesById(routeId) {
  return authors.find((r) => r.id === routeId);
}
module.exports = { routes , getRoutesById};
