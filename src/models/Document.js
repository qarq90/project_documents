const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_type: { type: String, required: true },
    file_link: { type: String, required: true },
    user_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const Documents =
    mongoose.models.Documents || mongoose.model("Documents", DocumentSchema);

module.exports = { Documents };
