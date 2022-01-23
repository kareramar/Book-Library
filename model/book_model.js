const mongoose = require("mongoose");
const db = require("../config/db");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "----",
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      default: "----",
    },
    description: {
      type: String,
      default: "----",
    },
    isbn: {
      type: String,
    },
    author: {
      type: String,
      default: "----",
    },
    publisher: {
      type: String,
      default: "----",
    },
  },
  { timestamps: true }
);

const bookmodel = db.model("books", bookSchema);

module.exports = bookmodel;
