const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-button");
const notesList = document.getElementById("notes-list");

addBtn.addEventListener("click", addNote);

function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") return;

    const noteItem = document.createElement("div");
    noteItem.className = "note";

    noteItem.innerHTML = `
        <p>${noteText}</p>
        <button class="delete" onclick="deleteNote(this)">Delete</button>
    `;

    notesList.appendChild(noteItem);
    noteInput.value = "";
}

function deleteNote(button) {
    const noteItem = button.parentElement;
    notesList.removeChild(noteItem);
}
