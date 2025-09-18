/*
Jaskunwar Hunjan A01195757
The code and comments in the file are written with the assistance of ChatGPT and Copilot.

This file controls the reader.html page.
It loads notes from localStorage every 2 seconds,
shows them in read-only textareas, and updates the "updated at" time.
*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("status");
  const notesContainer = document.getElementById("notes-container");

  // Update the label at the top with the current time
  function updateUpdatedAtLabel() {
    statusEl.textContent = `${MESSAGES.pages.reader.updatedAtPrefix} ${formatTime(new Date())}`;
  }

  // Display all notes as read-only textareas
  function renderNotesPlain(list) {
    notesContainer.innerHTML = ""; // clear old content
    list.forEach(n => {
      const textarea = document.createElement("textarea");
      textarea.value = n.text;
      textarea.rows = 3;
      textarea.readOnly = true;
      notesContainer.appendChild(textarea);
    });
  }

  // Load notes from localStorage and refresh the page display
  function refreshFromStorage() {
    const arr = loadNotes(); // [{id, text}, ...]
    renderNotesPlain(arr);
    updateUpdatedAtLabel();
  }

  // Back button setup
  const backBtnOld = document.getElementById("back-btn");
  const backButton = new Button(MESSAGES.pages.reader.back, () => {
    location.href = "index.html";
  }).element;
  backBtnOld.replaceWith(backButton);

  // Start: refresh immediately, then every 2 seconds
  refreshFromStorage();
  const timerId = setInterval(refreshFromStorage, 2000);

  // Clean up the timer if the page is closed or reloaded
  window.addEventListener("beforeunload", () => clearInterval(timerId));
});
