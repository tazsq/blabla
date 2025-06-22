const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    minLength: 2,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  createdRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }], // routes created by user (driver)
  joinedRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
