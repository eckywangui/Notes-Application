const noteTitleInput = document.getElementById('note-title');
const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-button');
const notesList = document.getElementById('notes-list');

// Load quotes and images on page load
loadQuotesAndImages();

function loadQuotesAndImages() {
    fetch('https://note-application-26gk.onrender.com/data')
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

                const quoteSection = document.getElementById('quote-section');
                // Display the quote and image in the quote section
                const quoteItem = document.createElement("div");
                quoteItem.className = "quote";
                quoteItem.innerHTML = `
                    <p class="quote-text">${randomQuote.text}</p>
                    <img class="quote-image" src="${randomQuote.image}" alt="Image">
                `;
                quoteSection.appendChild(quoteItem);
            } else {
                console.error('Data is empty or not in the expected format.');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

addBtn.addEventListener('click', addNote);

function addNote() {
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteInput.value.trim();

    if (noteTitle === '' || noteText === '') return;

    const noteItem = createNoteElement(noteTitle, noteText);
    notesList.appendChild(noteItem);

    // Save the new note to local storage
    saveNoteToLocalStorage(noteTitle, noteText);

    noteTitleInput.value = '';
    noteInput.value = '';
}

function createNoteElement(title, text) {
    const noteItem = document.createElement('div');
    noteItem.className = 'note';

    const date = new Date();
    const formattedDate = date.toLocaleString();

    noteItem.innerHTML = `
        <h3 class="note-title">${title}</h3>
        <p class="note-text">${text}</p>
        <p class="note-date">${formattedDate}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <button class="save">Save</button>
    `;

    const editButton = noteItem.querySelector('.edit');
    const deleteButton = noteItem.querySelector('.delete');
    const saveButton = noteItem.querySelector('.save');

    editButton.addEventListener('click', () => editNote(noteItem, title, text));
    deleteButton.addEventListener('click', () => deleteNote(noteItem, title));
    saveButton.addEventListener('click', () => saveNote(noteItem, title, text));

    return noteItem;
}

function editNote(noteItem, title, text) {
    const titleElement = noteItem.querySelector('.note-title');
    const textElement = noteItem.querySelector('.note-text');
    
    // Prompt the user to edit the title and text
    const newTitle = prompt('Edit title:', title);
    const newText = prompt('Edit text:', text);

    titleElement.textContent = newTitle;
    textElement.textContent = newText;

    // Update the note in local storage
    saveNoteToLocalStorage(newTitle, newText);
}

function deleteNote(noteItem, title) {
    // Ask for confirmation before deleting the note
    const confirmed = confirm('Are you sure you want to delete this note?');

    if (confirmed) {
        
        console.log("Delete button clicked for: " + title);

        noteItem.remove();
        
        alert('Your note has been deleted!');
    }
   
}

function saveNote(noteItem, title, text) {
    const titleElement = noteItem.querySelector('.note-title');
    const textElement = noteItem.querySelector('.note-text');

    const newTitle = titleElement.textContent;
    const newText = textElement.textContent;

    // Save the updated note to local storage
    saveNoteToLocalStorage(newTitle, newText);
    alert('Your note has been saved!');
}



function saveNoteToLocalStorage(title, text) {

    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

    const updatedNotes = existingNotes.concat({ title, text });

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

function loadNotesFromLocalStorage() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));

    if (savedNotes) {
        savedNotes.forEach((note) => {
            const { title, text } = note;
            const noteItem = createNoteElement(title, text);
            notesList.appendChild(noteItem);
        });
    }
}

// load existing notes on page load
loadNotesFromLocalStorage(); 
