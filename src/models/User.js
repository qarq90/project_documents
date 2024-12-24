import mongoose from "mongoose";

const {Schema} = mongoose

const UserSchema = new Schema({
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

export default Users
