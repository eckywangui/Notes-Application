const noteTitleInput = document.getElementById("note-title");
const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-button");
const notesList = document.getElementById("notes-list");

addBtn.addEventListener("click", addNote);

function addNote() {
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteInput.value.trim();

    if (noteTitle === "" || noteText === "") return;

    const noteItem = document.createElement("div");
    noteItem.className = "note";

    const date = new Date();
    const formattedDate = date.toLocaleString();

    noteItem.innerHTML = `
        <h3 class="note-title">${noteTitle}</h3>
        <p class="note-text">${noteText}</p>
        <p class="note-date">${formattedDate}</p>
        <button class="edit" onclick="editNote(this)">Edit</button>
        <button class="delete" onclick="deleteNote(this)">Delete</button>
        <button class="save" onclick="saveNote(this)">Save</button>
    `;

    notesList.appendChild(noteItem);

    noteTitleInput.value = "";
    noteInput.value = "";
}

function editNote(button) {
    const noteItem = button.parentElement;
    const noteText = noteItem.querySelector(".note-text");
    const noteTitle = noteItem.querySelector(".note-title");
    const saveButton = noteItem.querySelector(".save");
    
    noteText.contentEditable = true;
    noteText.focus();
    noteTitle.contentEditable = true;
    noteTitle.focus();
    button.style.display = "none";
    saveButton.style.display = "inline";
}

function saveNote(button) {
    const noteItem = button.parentElement;
    const noteText = noteItem.querySelector(".note-text");
    const noteTitle = noteItem.querySelector(".note-title");
    const editButton = noteItem.querySelector(".edit");
    
    noteText.contentEditable = false;
    noteTitle.contentEditable = false;
    button.style.display = "none";
    editButton.style.display = "inline";
}

function deleteNote(button) {
    const noteItem = button.parentElement;
    notesList.removeChild(noteItem);
}
