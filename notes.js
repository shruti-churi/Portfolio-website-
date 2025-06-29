// Clock & Date
function updateDateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const date = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
  document.getElementById("date").textContent = date;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Sticky Notes
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note textarea").forEach(note => {
    notes.push(note.value);
  });
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function createNote(content = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.textContent = "✕";
  delBtn.onclick = () => {
    note.remove();
    saveNotes();
  };

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.oninput = saveNotes;

  note.appendChild(delBtn);
  note.appendChild(textarea);
  notesContainer.appendChild(note);
}

addNoteBtn.onclick = () => {
  createNote();
  saveNotes();
};

// Load saved notes
(function () {
  const savedNotes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  savedNotes.forEach(note => createNote(note));
})();
