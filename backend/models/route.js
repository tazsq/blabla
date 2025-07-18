const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  from: { type: String, minLength: 2, required: true },
  to: { type: String, minLength: 2, required: true },
  date: { type: String, required: true },
  passengerCapacity: { type: Number, required: true },
  // users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // multiple riders
});

routeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Route", routeSchema);
