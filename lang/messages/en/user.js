// lang/messages/en/user.js
// Single place for all strings shown to the user (no hard-coded UI text elsewhere).
// Putting it on window is intentional so other files can read it.
window.MESSAGES = {
  appTitle: "Lab 1: JSON, Object Constructor, localStorage — Jaskunwar Hunjan",

  pages: {
    index: {
      writerBtn: "Writer Page",
      readerBtn: "Reader Page"
    },
    writer: {
      storedAtPrefix: "Stored at:",
      add: "Add Note",
      remove: "Delete",
      back: "Back"
    },
    reader: {
      updatedAtPrefix: "Updated at:",
      back: "Back"
    }
  },

  storage: {
    key: "lab1_notes"
  }
};
