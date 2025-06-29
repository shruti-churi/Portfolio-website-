// Contact form response
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("msg").textContent = "Thank you for your message!";
  this.reset();
});

// Sticky Notes
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note textarea").forEach(textarea => {
    notes.push(textarea.value);
  });
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function createNote(content = "") {
  const note = document.createElement("div");
  note.className = "note";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✕";
  deleteBtn.onclick = () => {
    note.remove();
    saveNotes();
  };

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.oninput = saveNotes;

  note.appendChild(deleteBtn);
  note.appendChild(textarea);
  notesContainer.appendChild(note);
}

addNoteBtn.onclick = () => {
  createNote();
  saveNotes();
};

(function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  saved.forEach(text => createNote(text));
})();
