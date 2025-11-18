const { Schema, model, default: mongoose } = require("mongoose");

const noteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
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
const noteModel = model("notes", noteSchema);
module.exports = noteModel;
