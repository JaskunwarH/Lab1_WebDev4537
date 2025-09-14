/*
Jaskunwar Hunjan A01195757
The code and comments in the file are written with the assistance of ChatGPT and Copilot.

This file sets up the index.html page.
It fills in the title and button text from user.js,
and adds click actions to move to the writer or reader pages.
*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Set the page title text
  document.getElementById("page-title").textContent = MESSAGES.appTitle;

  // Writer button setup
  const writerBtn = document.getElementById("writer-btn");
  writerBtn.textContent = MESSAGES.pages.index.writerBtn; // label from user.js
  writerBtn.addEventListener("click", () => {
    location.href = "writer.html"; // go to writer page
  });

  // Reader button setup
  const readerBtn = document.getElementById("reader-btn");
  readerBtn.textContent = MESSAGES.pages.index.readerBtn; // label from user.js
  readerBtn.addEventListener("click", () => {
    location.href = "reader.html"; // go to reader page
  });
});
