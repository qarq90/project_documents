const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    pass: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    pfp: { type: String, required: true },
});

let Users;

try {
    Users = mongoose.model("Users");
} catch {
    Users = mongoose.model("Users", UserSchema);
}

module.exports = Users;
