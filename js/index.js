// js/index.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Title from messages
  document.getElementById("page-title").textContent = MESSAGES.appTitle;

  // Writer button
  const writerBtn = document.getElementById("writer-btn");
  writerBtn.textContent = MESSAGES.pages.index.writerBtn;
  writerBtn.addEventListener("click", () => {
    location.href = "writer.html";
  });

  // Reader button
  const readerBtn = document.getElementById("reader-btn");
  readerBtn.textContent = MESSAGES.pages.index.readerBtn;
  readerBtn.addEventListener("click", () => {
    location.href = "reader.html";
  });
});
