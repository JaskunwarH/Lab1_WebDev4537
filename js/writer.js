/*
Jaskunwar Hunjan A01195757
The code and comments in the file are written with the assistance of ChatGPT and Copilot.

This file controls the writer.html page.
It lets me add/remove notes, auto-saves all notes every 2 seconds,
and shows the time they were last saved.
*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // --- Get references to page elements ---
  const statusEl = document.getElementById("status");
  const notesContainer = document.getElementById("notes-container");
  const addBtn = document.getElementById("add-btn");

  // Keep Note objects here (not plain {id,text})
  let notes = [];

  // --- Small helpers for this page ---

  // Show the latest "stored at" time at the top
  function updateStoredAtLabel() {
    statusEl.textContent = `${MESSAGES.pages.writer.storedAtPrefix} ${formatTime(new Date())}`;
  }

  // Turn Note objects into plain objects before saving to localStorage
  function toPlainObjects() {
    return notes.map(n => ({ id: n.id, text: n.getText() }));
  }

  // Save all notes right now and update the time label
  function saveNow() {
    saveNotes(toPlainObjects());
    updateStoredAtLabel();
  }

  // Create a new Note, add it to the list, and render it on the page
  function addNewNote(initialText = "") {
    // Simple unique id using time + random
    const id = `n_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const note = new Note(id, initialText);
    notes.push(note);
    note.render(notesContainer, handleRemoveById);
  }

  // Remove a note by id and save immediately (so reader page updates fast)
  function handleRemoveById(id) {
    notes = notes.filter(n => n.id !== id);
    saveNow();
  }

  // --- Load any saved notes on page start ---
  const stored = loadNotes(); // array like [{id, text}, ...]
  // Simple approach: recreate notes from text (ids change, which is fine here)
  stored.forEach(obj => addNewNote(obj.text));

  // --- Add button setup ---
  addBtn.textContent = MESSAGES.pages.writer.add; // label from user.js
  addBtn.addEventListener("click", () => {
    addNewNote(""); // new empty note
    // No need to save right away; autosave runs every 2 seconds.
  });

  // --- Back button setup ---
  const backBtn = document.getElementById("back-btn");
  backBtn.textContent = MESSAGES.pages.writer.back;
  backBtn.addEventListener("click", () => {
    location.href = "index.html";
  });

  // --- Autosave timer ---
  updateStoredAtLabel(); // show an initial time
  const timerId = setInterval(saveNow, 2000); // save every 2 seconds (per lab requirement)

  // Stop the timer if the page is closing
  window.addEventListener("beforeunload", () => clearInterval(timerId));
});
