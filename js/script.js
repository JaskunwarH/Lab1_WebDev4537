/*
Jaskunwar Hunjan A01195757
The code and comments in the file are written with the assistance of ChatGPT and Copilot.

This file holds shared code used by both writer.js and reader.js.
It includes helper functions for localStorage, a time formatter,
and the Note object constructor for creating and managing notes.
*/

"use strict";

/* Load notes from localStorage
   - Reads the saved JSON string
   - Returns an array of note objects
   - If nothing saved or invalid, returns an empty array */
function loadNotes() {
  const raw = localStorage.getItem(MESSAGES.storage.key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* Save notes to localStorage
   - Takes an array of plain objects {id, text}
   - Converts it to a JSON string and saves */
function saveNotes(notesArray) {
  localStorage.setItem(MESSAGES.storage.key, JSON.stringify(notesArray));
}

/* Format a Date object as HH:MM:SS
   - Used for showing "stored at" or "updated at" times */
function formatTime(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/* 
 Note object constructor
 - Each note has an id, text, and references to its DOM elements
 - Methods:
   render(container, onRemove) → create textarea + remove button in the page
   getText() → get current textarea value
   setText(v) → set textarea value
   remove() → remove its DOM elements
*/
function Note(id, text) {
  this.id = id;
  this.text = text;
  this.textareaEl = null;
  this.removeBtnEl = null;
}

Note.prototype.render = function (container, onRemove) {
  // Create wrapper for textarea + button
  const wrap = document.createElement("div");

  // Create textarea for note content
  const ta = document.createElement("textarea");
  ta.value = this.text;
  ta.rows = 3;

  // Create remove button
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = MESSAGES.pages.writer.remove;

  // Save references for later use
  this.textareaEl = ta;
  this.removeBtnEl = btn;

  // When remove button is clicked:
  // - remove from DOM
  // - call callback so page logic can update storage
  btn.addEventListener("click", () => {
    this.remove();
    if (typeof onRemove === "function") onRemove(this.id);
  });

  // Add textarea and button to the wrapper, then to the page
  wrap.appendChild(ta);
  wrap.appendChild(btn);
  container.appendChild(wrap);
};

Note.prototype.getText = function () {
  return this.textareaEl ? this.textareaEl.value : this.text;
};

Note.prototype.setText = function (v) {
  this.text = v;
  if (this.textareaEl) this.textareaEl.value = v;
};

Note.prototype.remove = function () {
  // Remove the wrapper element from the page
  if (this.textareaEl && this.textareaEl.parentElement) {
    this.textareaEl.parentElement.remove();
  }
  this.textareaEl = null;
  this.removeBtnEl = null;
};
