const noteTitleInput = document.getElementById("note-title");
const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-button");
const notesList = document.getElementById("notes-list");

// Load notes from localStorage on startup
loadNotesFromLocalStorage();

addBtn.addEventListener("click", addNote);

function addNote() {
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteInput.value.trim();

    if (noteTitle === "" || noteText === "") return;

    fetch("https://note-application-26gk.onrender.com/data")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomQuote = data[randomIndex];

                const noteItem = document.createElement("div");
                noteItem.className = "note";

                const date = new Date();
                const formattedDate = date.toLocaleString();

                noteItem.innerHTML = `
                    <h3 class="note-title">${noteTitle}</h3>
                    <p class="note-text">${noteText}</p>
                    <p class="note-date">${formattedDate}</p>
                    <p class="quote-text">${randomQuote.text}</p>
                    <img class="quote-image" src="${randomQuote.image}" alt="Image">
                    <button class="edit" onclick="editNote(this)">Edit</button>
                    <button class="delete" onclick="deleteNote(this)">Delete</button>
                    <button class="save" onclick="saveNote(this)">Save</button>
                `;

                notesList.appendChild(noteItem);

              
                saveNoteToLocalStorage(noteTitle, noteText);

                noteTitleInput.value = "";
                noteInput.value = "";
            } else {
                console.error("Data is empty or not in the expected format.");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function editNote(button) {
    const noteItem = button.parentElement;
    const noteText = noteItem.querySelector(".note-text");
    const noteTitle = noteItem.querySelector(".note-title");
    const saveButton = noteItem.querySelector(".save");
    const editButton = button;

    noteText.contentEditable = true;
    noteText.focus();
    noteTitle.contentEditable = true;
    noteTitle.focus();
    editButton.style.display = "none";
    saveButton.style.display = "inline";
}

function saveNote(button) {
    const noteItem = button.parentElement;
    const noteText = noteItem.querySelector(".note-text");
    const noteTitle = noteItem.querySelector(".note-title");
    const saveButton = button;
    const editButton = noteItem.querySelector(".edit");

    noteText.contentEditable = false;
    noteTitle.contentEditable = false;
    saveButton.style.display = "none";
    editButton.style.display = "inline";

    // Save the changes to local storage
    saveNoteToLocalStorage(noteTitle.innerText, noteText.innerText);
}

function deleteNote(button) {
    const noteItem = button.parentElement;
    notesList.removeChild(noteItem);

    // Remove the note from local storage
    deleteNoteFromLocalStorage(noteItem.querySelector(".note-title").innerText);
}

function saveNoteToLocalStorage(title, text) {
    // Load existing notes from localStorage
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];


    const updatedNotes = existingNotes.map((note) => {
        if (note.title === title) {
            return { title, text };
        }
        return note;
    });

    // Save the updated notes array to localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
}

function deleteNoteFromLocalStorage(title) {
   
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

   
    const updatedNotes = existingNotes.filter((note) => note.title !== title);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
}

function loadNotesFromLocalStorage() {
   
    const savedNotes = JSON.parse(localStorage.getItem("notes"));

    if (savedNotes) {
        savedNotes.forEach((note) => {
            const { title, text } = note;
            const noteItem = document.createElement("div");
            noteItem.className = "note";

            const date = new Date();
            const formattedDate = date.toLocaleString();

            noteItem.innerHTML = `
                <h3 class="note-title">${title}</h3>
                <p class="note-text">${text}</p>
                <p class="note-date">${formattedDate}</p>
                <button class="edit" onclick="editNote(this)">Edit</button>
                <button class="delete" onclick="deleteNote(this)">Delete</button>
                <button class="save" onclick="saveNote(this)">Save</button>
            `;

            notesList.appendChild(noteItem);
        });
    }
}
