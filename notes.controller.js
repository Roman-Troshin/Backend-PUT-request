const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");
console.log(notesPath);

async function addNote(title) {
  console.log("title:", title);
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(idForRemove) {
  const notes = await getNotes();
  const editedNotes = notes.filter((note) => note.id !== idForRemove);

  await fs.writeFile(notesPath, JSON.stringify(editedNotes));
}

async function editNote(idForEdit, titleForEdit) {
  const editedNotes = await getNotes();
  editedNotes.forEach((note) =>
    note.id === idForEdit ? (note.title = titleForEdit) : null
  );

  await fs.writeFile(notesPath, JSON.stringify(editedNotes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("The list of notes"));
  notes.forEach(({ title, id }) => {
    console.log(chalk.blue(id, title));
  });
}

module.exports = {
  addNote,
  removeNote,
  editNote,
  getNotes,
};
