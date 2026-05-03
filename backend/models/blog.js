const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, default: "Anonymous" },
  tags: [{ type: String, trim: true }],
  imageUrl: { type: String, default: "" },
  imageDescription: { type: String, default: "" },
  userEmail: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model("blog", blogSchema);
