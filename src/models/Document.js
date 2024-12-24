import mongoose from "mongoose";

const {Schema} = mongoose

const DocumentSchema = new Schema({
    file_name: { type: String, required: true },
    file_type: { type: String, required: true },
    file_link: { type: String, required: true },
    user_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

let Documents;

try {
    Documents = mongoose.model("Documents");
} catch {
    Documents = mongoose.model("Documents", DocumentSchema);
}

export default Documents
