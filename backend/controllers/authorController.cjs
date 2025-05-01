const db = require("../db.cjs");
//previous controller
// async function getAuthorById(req, res) {
//   const authorId = req.params.authorId;
//   const author = await db.getAuthorById(Number(authorId));
//   if (!author) {
//     res.status(404).send("Author not found");
//     return;
//   }
//   res.send(`Author name : ${author.name}`);
// }

//new MVC pattern controller MUCH BETTER!!!!!
const authorController = {
  get: async (req, res) => {
    const authorId = req.params.authorId;
    const author = await db.getAuthorById(Number(authorId));
    if (!author) {
      res.status(404).send("Author not found");
      return;
    }
    res.send(`Author name : ${author.name}`);
  },
};
module.exports = {
  authorController,
};
