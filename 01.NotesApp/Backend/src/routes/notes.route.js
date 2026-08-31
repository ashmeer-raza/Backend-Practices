const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updatesNotesController,
  deleteNoteController,
  singleEntityUpdateController,
} = require("../controllers/notes.controller");

const router = express.Router();

router.post("/create", createNotesController); //CREATE
router.get("/allNotes", getAllNotesController); //READ
router.get("/:id", getSingleNoteController); //READ ONE
router.put("/:id", updatesNotesController); //UPDATED VIA PUT
router.delete("/:id", deleteNoteController); //DELETE
router.patch("/:id/single", singleEntityUpdateController);

module.exports = router;
