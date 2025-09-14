// js/reader.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("status");
  const notesContainer = document.getElementById("notes-container");

  function updateUpdatedAtLabel() {
    statusEl.textContent = `${MESSAGES.pages.reader.updatedAtPrefix} ${formatTime(new Date())}`;
  }

  function renderNotesPlain(list) {
    // Clear and render as read-only blocks (disabled textareas for clarity)
    notesContainer.innerHTML = "";
    list.forEach(n => {
      const ta = document.createElement("textarea");
      ta.value = n.text;
      ta.rows = 3;
      ta.readOnly = true;     // or ta.setAttribute("readonly", "true")
      notesContainer.appendChild(ta);
    });
  }

  function refreshFromStorage() {
    const arr = loadNotes(); // [{id,text}, ...]
    renderNotesPlain(arr);
    updateUpdatedAtLabel();
  }

  const backBtn = document.getElementById("back-btn");
  backBtn.textContent = MESSAGES.pages.reader.back;
  backBtn.addEventListener("click", () => {
    location.href = "index.html";
  });


  // Initial and repeating refresh
  refreshFromStorage();
  const timerId = setInterval(refreshFromStorage, 2000);

  // Optional: set back button text via JS
  // document.querySelector('button[onclick*="index.html"]').textContent = MESSAGES.pages.reader.back;

  window.addEventListener("beforeunload", () => clearInterval(timerId));
});
