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
   getText() = get current textarea value
   setText(v) = set textarea value
   remove() = remove its DOM elements
*/

// Note class
class Note {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.noteTextarea = null;
    this.removeBtnEl = null;
  }

  render(container, onRemove) {
    // Create wrapper for textarea + button
    const wrap = document.createElement("div");


    // Create textarea for note content
    const textarea = document.createElement("textarea");
    textarea.value = this.text;
    textarea.rows = 3;

    // Remove button
    const removeButton = new Button(MESSAGES.pages.writer.remove, () => {
      this.remove();
      if (typeof onRemove === "function") onRemove(this.id);
    }).element;


    // Save references for later use
    this.noteTextarea = textarea;
    this.removeBtnEl = removeButton;

    // Add textarea and button to the wrapper, then to the page
    wrap.appendChild(textarea);
    wrap.appendChild(removeButton);
    container.appendChild(wrap);
  }

  getText() {
    return this.noteTextarea ? this.noteTextarea.value : this.text;
  }

  setText(v) {
    this.text = v;
    if (this.noteTextarea) this.noteTextarea.value = v;
  }

  remove() {
    // Remove the wrapper element from the page
    if (this.noteTextarea && this.noteTextarea.parentElement) {
      this.noteTextarea.parentElement.remove();
    }
    this.noteTextarea = null;
    this.removeBtnEl = null;
  }
}

// Button class for creating buttons
class Button {
  constructor(label, onClick) {
    this.element = document.createElement("button");
    this.element.type = "button";
    this.element.textContent = label;
    if (typeof onClick === "function") {
      this.element.addEventListener("click", onClick);
    }
  }
}
