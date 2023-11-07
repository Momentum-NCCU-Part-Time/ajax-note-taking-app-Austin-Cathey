const app = {
    data: {
        url: "http://localhost:3000/notes/",
        notes:[]
        
    },
    
//gets notes from url
    getNotes: function() { 
        fetch(this.data.url, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(r => r.json())
        .then(response => {
           for (let note of response) {
            this.data.notes.push(note)
            };
           this.generateNotesHTML();
           }) 
    },
//creates noteCard divs to show the data
    generateNotesHTML: function() {
        const noteContainer = document.getElementById("container");
        for (let note of this.data.notes) {
        noteContainer.innerHTML += `
        <div class="noteCard">
            <div>${note.title}</div>
            <div>${note.body}</div>
            <button class="editButton" data-id=${note.id}>Edit</button>
            <button class="deleteButton" data-id=${note.id}>Delete</button>
        </div>
        `}
        this.addEventListeners();
    },

    refresh: function() {
        window.parent.location = window.parent.location.href;
    },

    //methods
// Creates new notes, currently bugged, makes new notes on page reload
createNote: function() { 
    let newTitle = document.getElementById("newTitle").value;
    let noteBody = document.getElementById("noteBody").value;
    let newNote = {
        title: newTitle,
        body: noteBody
    }

    fetch(this.data.url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newNote),
    })
    .then(r => r.json())
    .then(response => {
        this.generateNotesHTML()
    }) 
},
//Deletes notes
deleteNote: function(noteId) { 
    console.log({noteId})
    fetch(this.data.url + noteId, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })
    .then(r => r.json())
    .then(response => {
           this.generateNotesHTML();
           
    })
},

//Currently a spicy option
/* confirmDelete: function(noteId) {
    let confirmDelete = window.confirm("Confirm delete");
    if (deleteConfirm) {
        this.deleteNote(noteId);
    }
}, */

editNote:function(noteId) {
    
    let editedTitle = document.getElementById("editTitle").value;
    let editedBody = document.getElementById("editBody").value;
    let editedNote = {
        title: editedTitle,
        body: editedBody,
    }

    fetch(this.data.url + noteId, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editedNote),
    })
    .then(r => r.json())
    .then(response => {
        this.data.notes = []
        this.getNotes()
    })
},
// call displayEditForm, saves/overwrites note (request)
//with eventlistener to remove hidden
    //this should just be a variation of the display create form, but prepopulated

displayEditForm: function(noteId) {
    let note = this.data.notes.find(note = note.id == noteId);
    console.log(note)
    if (!note) {
        console.error("Sorry bro :[");
        return
    }
    document.getElementById("editTitle").value = note.title;
    document.getElementById("editBody").value = note.body;
    let editedNote = document.getElementById("editedNote");
    editedNote.dataset.id = noteId
    let form = document.getElementById("editForm");
     form.classList.remove("hidden"); 
},

  

    addEventListeners: function() {
        let deleteButtons = document.querySelectorAll('.deleteButton');
    for (let button of deleteButtons) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
        this.refresh();
    });   
    }

    let saveButton = document.querySelectorAll('.saveNote');
    for (let button of saveButton) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            this.createNote(button.dataset.id);
            this.refresh();
        });
    }
//displays edit form
    let editButtons = document.querySelectorAll(".editButton");
    for (let button of editButtons) {
        button.addEventListener("click", (event) => {
        event.preventDefault();
        this.displayEditForm(button.dataset.id);
        });
    }
//edit button for saving actual edits
    let editNote = document.getElementById('editedNote');
        editNote.addEventListener('click', (event) => {
            event.preventDefault();
            this.editNote(editNote.dataset.id);
            /* this.refresh(); */
        });
    
},

    main: function() {
        //call getNotes(), set up event listeners (will contain if statements,
        //or other code to call when a user clicks edit, delete or create)
        //use event.preventDefault();
        
        this.getNotes();

        /* this.createNote();
        this.deleteNote();
        this.editNote(); */
       
        
    //eventListener: editNote(event.target.data-id)
    
}
}
app.main() //was getNotes