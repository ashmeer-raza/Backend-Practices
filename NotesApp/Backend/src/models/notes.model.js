const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [20, "min 20 char required"],
  },
});

const NotesModel = mongoose.model("notes", notesSchema); // (modelName , Schema)
module.exports = NotesModel;
