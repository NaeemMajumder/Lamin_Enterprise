
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true }
});

adminSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Admin", adminSchema);
