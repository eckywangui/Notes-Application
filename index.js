document.addEventListener("DOMContentLoaded", function() {
    const notes = document.getElementById("notes");
    const noteText = document.getElementById("note-text");
    const addButton = document.getElementById("add-button");
    const saveButton = document.getElementById("save-button");
    const deleteButton = document.getElementById("delete-button");

    addButton.addEventListener("click", function() {
        const text = noteText.value;
        if (text.trim() !== "") {
            const listItem = document.createElement("li");
            listItem.innerText = text;
            notes.appendChild(listItem);
            noteText.value = "";
        }
    });

    saveButton.addEventListener("click", function() {
        const text = noteText.value;
        if (text.trim() !== "") {
            const listItem = notes.querySelector("li.selected");
            if (listItem) {
                listItem.innerText = text;
            }
        }
    });

    deleteButton.addEventListener("click", function() {
        const listItem = notes.querySelector("li.selected");
        if (listItem) {
            notes.removeChild(listItem);
            noteText.value = "";
        }
    });

    notes.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            const listItem = event.target;
            noteText.value = listItem.innerText;
            selectListItem(listItem);
        }
    });

    function selectListItem(listItem) {
        const items = notes.getElementsByTagName("li");
        for (const item of items) {
            item.classList.remove("selected");
        }
        listItem.classList.add("selected");
    }
});
