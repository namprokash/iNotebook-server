const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("notes", noteSchema);
