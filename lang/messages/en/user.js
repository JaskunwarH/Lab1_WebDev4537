/*
Jaskunwar Hunjan A01195757
The code and comments in the file are written with the assistance of ChatGPT and Copilot.

This file stores all user-facing strings and the localStorage key.
Keeping them here avoids hard-coded text inside the HTML or other JS files.
*/

window.MESSAGES = {
  // Title shown on the index page
  appTitle: "Lab 1: JSON, Object Constructor, localStorage — Jaskunwar Hunjan",

  pages: {
    // Strings used on index.html
    index: {
      writerBtn: "Writer Page",
      readerBtn: "Reader Page"
    },
    // Strings used on writer.html
    writer: {
      storedAtPrefix: "Stored at:",
      add: "Add Note",
      remove: "Delete",
      back: "Back"
    },
    // Strings used on reader.html
    reader: {
      updatedAtPrefix: "Updated at:",
      back: "Back"
    }
  },

  // Key name for localStorage
  storage: {
    key: "lab1_notes"
  }
};
