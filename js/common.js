// js/common.js
// Small utilities that both writer and reader need.

"use strict";

// Read array of note objects from localStorage.
// Returns [] if nothing is stored or if JSON is invalid.
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

// Save an array of plain note objects to localStorage.
function saveNotes(notesArray) {
  localStorage.setItem(MESSAGES.storage.key, JSON.stringify(notesArray));
}

// Convert a Date to "HH:MM:SS" (24h) for the labels.
function formatTime(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/*
 * -------- Object Constructor (old JS OOP) --------
 * Each Note has:
 *   - id:   unique string
 *   - text: current content
 *   - dom:  references to its textarea and remove button (set in render)
 *
 * Methods:
 *   - render(container, onRemove): create textarea + remove button, attach to DOM
 *   - getText(): read current textarea value
 *   - setText(v): set textarea value
 *   - remove(): remove its DOM nodes (caller also updates storage)
 */
function Note(id, text) {
  this.id = id;
  this.text = text;
  this.textareaEl = null;
  this.removeBtnEl = null;
}

Note.prototype.render = function (container, onRemove) {
  // wrapper keeps textarea and button together
  const wrap = document.createElement("div");

  const ta = document.createElement("textarea");
  ta.value = this.text;
  ta.rows = 3;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = MESSAGES.pages.writer.remove;

  // Keep references so other methods can use them
  this.textareaEl = ta;
  this.removeBtnEl = btn;

  // Remove calls the provided callback with this note's id
  btn.addEventListener("click", () => {
    this.remove();
    if (typeof onRemove === "function") onRemove(this.id);
  });

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
  // Remove the wrapper (textarea's parent) from the DOM if present
  if (this.textareaEl && this.textareaEl.parentElement) {
    this.textareaEl.parentElement.remove();
  }
  this.textareaEl = null;
  this.removeBtnEl = null;
};
