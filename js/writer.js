// js/writer.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // DOM hooks
  const statusEl = document.getElementById("status");
  const notesContainer = document.getElementById("notes-container");
  const addBtn = document.getElementById("add-btn");

  // In-memory list of Note objects (not plain objects)
  let notes = [];

  // ---- helpers for this page ----
  function updateStoredAtLabel() {
    statusEl.textContent = `${MESSAGES.pages.writer.storedAtPrefix} ${formatTime(new Date())}`;
  }

  function toPlainObjects() {
    // Convert Note instances to plain objects before saving
    return notes.map(n => ({ id: n.id, text: n.getText() }));
  }

  function saveNow() {
    saveNotes(toPlainObjects());
    updateStoredAtLabel();
  }

  function addNewNote(initialText = "") {
    const id = `n_${Date.now()}_${Math.random().toString(16).slice(2)}`; // simple unique id
    const note = new Note(id, initialText);
    notes.push(note);
    note.render(notesContainer, handleRemoveById);
  }

  function handleRemoveById(id) {
    // Remove from array
    notes = notes.filter(n => n.id !== id);
    // Save immediately (lab requires instant removal from storage)
    saveNow();
  }

  // ---- initial load: restore notes from storage ----
  const stored = loadNotes(); // array of {id, text}
  stored.forEach(obj => addNewNote(obj.text)); // new ids are fine since we store by order, but keep id:
  // If you prefer to preserve ids:
  // stored.forEach(obj => {
  //   const note = new Note(obj.id, obj.text);
  //   notes.push(note);
  //   note.render(notesContainer, handleRemoveById);
  // });

  // ---- add button ----
  addBtn.textContent = MESSAGES.pages.writer.add;
  addBtn.addEventListener("click", () => {
    addNewNote("");
    // Don't save immediately; autosave will catch it, which meets the spec.
  });

  const backBtn = document.getElementById("back-btn");
  backBtn.textContent = MESSAGES.pages.writer.back;
  backBtn.addEventListener("click", () => {
    location.href = "index.html";
  });


  // ---- autosave every 2 seconds ----
  updateStoredAtLabel(); // show initial time
  const timerId = setInterval(saveNow, 2000);

  // ---- set static labels from messages ----
  // (The remove labels are already set in Note.render)
  // Back button text if you want to set it via JS (optional):
  // document.querySelector('button[onclick*="index.html"]').textContent = MESSAGES.pages.writer.back;

  // Clean up timer if page is ever unloaded
  window.addEventListener("beforeunload", () => clearInterval(timerId));
});
