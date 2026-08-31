const NotesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;
    let newNote = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Notes Created",
      data: newNote,
    });
  } catch (error) {
    console.log("Error while creating Notes", error);
    return res.status(500).json({
      message: "Error while creating note",
      error: error.message,
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    let allNotes = await NotesModel.find();

    return res.status(200).json({
      message: "Notes Fetched",
      data: allNotes,
    });
  } catch (error) {
    console.log("Error while creating Notes", error);
    return res.status(500).json({
      message: "Error while getting note",
      error: error.message,
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;

    let note = await NotesModel.findById(noteId);

    res.status(200).json({
      message: "Note Fetches",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

const updatesNotesController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;
    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true,
    });

    return res.status(200).json({
      message: "Note Updated",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;

    let notes = await NotesModel.findByIdAndDelete(noteId);
    return res.status(200).json({
      message: "Note Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

const singleEntityUpdateController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;

    const updteNote = await NotesModel.findByIdAndUpdate(noteId, body);
    return res.status(200).json({
      message: "Note Updated",
      data: updteNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updatesNotesController,
  deleteNoteController,
  singleEntityUpdateController,
};
