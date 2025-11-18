const express = require("express");
const noteModel = require("../models/NotesSchema");
const { body, validationResult } = require("express-validator");
const logedinUser = require("../middleware/LogedinUser");
const mongoose = require("mongoose");
const noteRouter = express.Router();

// == create notes using post =========
noteRouter.post(
  "/note",
  logedinUser,
  [
    body("title")
      .notEmpty()
      .withMessage("Note title cannot be empty!")
      .isLength({ min: 5 }),
    body("description")
      .notEmpty()
      .withMessage("Description cannot be empty!")
      .isLength({ min: 12 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("value error");
      // return res.status(400).send(errors.array().map((v) => v.msg));
    }

    const { title, description, tag } = req.body;

    const newNote = await noteModel.create({
      title,
      description,
      tag,
      userId: req.user._id,
    });
    res.send(newNote);
  }
);

// == get notes of user =========
noteRouter.get("/notes", logedinUser, async (req, res) => {
  let userId = req.user._id;

  const notes = await noteModel.find({ userId });

  console.log(notes[1].userId.toString());
  res.status(200).send({
    message: "Notes were returned successfully!",
    payload: notes,
  });
});

// == Updating notes using post =========
noteRouter.put(
  "/note/:id",
  logedinUser,
  [
    body("title")
      .notEmpty()
      .withMessage("Note title cannot be empty!")
      .isLength({ min: 5 }),
    body("description")
      .notEmpty()
      .withMessage("Description cannot be empty!")
      .isLength({ min: 12 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("value error");
      // return res.status(400).send(errors.array().map((v) => v.msg));
    }

    const { title, description, tag } = req.body;
    const options = {
      new: true,
      runValidators: true,
      context: "query",
    };
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    const noteId = req.params.id;
    // === find note ==========
    const findNote = await noteModel.findById(noteId);
    if (!findNote) {
      return res.status(404).send("Note not found!");
    }

    // == checking user of this note ====================
    if (req.user._id !== findNote.userId.toString()) {
      return res.status(401).send("Access denied!");
    }

    // == updating note ============
    const updateNote = await noteModel.findByIdAndUpdate(
      noteId,
      newNote,
      options
    );

    res.status(200).send({
      message: "Note has been updated successfully!",
      payload: updateNote,
    });
  }
);

// == Deleting notes using post =========
noteRouter.delete("/note/:id", logedinUser, async (req, res) => {
  const noteId = req.params.id;
  // === find note ==========
  const findNote = await noteModel.findById(noteId);
  if (!findNote) {
    return res.status(404).send("Note not found!");
  }

  // == checking user of this note ====================
  if (req.user._id !== findNote.userId.toString()) {
    return res.status(401).send("Access denied!");
  }

  // == deleting note ============
  const deleteNote = await noteModel.findByIdAndDelete(noteId);
  res.status(200).send({
    message: "Note has been deleted successfully!",
    payload: deleteNote,
  });
});

module.exports = noteRouter;
