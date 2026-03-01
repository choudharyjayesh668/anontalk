const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        category: { type: String }, // ✅ added
        likes: { type: Number, default: 0 },
        comments: [
            {
                text: String,
                likes: { type: Number, default: 0 }, // ✅ added
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);