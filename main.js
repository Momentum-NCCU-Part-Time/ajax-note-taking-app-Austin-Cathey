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

//Deletes notes, currently bugged, multiplies notes
deleteNote: function(noteId) { 
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
    fetch(this.data.url + noteId, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editedNote),
    })
    .then(r => r.json())
    .then(response => {
        this.generateNotesHTML()
    })
},
// call displayEditForm, saves/overwrites note (request)

/* displayEditForm: function(note) {
    let form = document.getElementById('editForm');
     form.classList.remove('hidden') //with eventlistener to remove hidden
    //this should just be a variation of the display create form, but prepopulated
}, */

  

    addEventListeners: function() {
        let deleteButtons = document.querySelectorAll('.deleteButton');
for (let button of deleteButtons) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
    });   
}

    let saveButton = document.querySelectorAll('.saveNote');
    for (let button of saveButton) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            this.createNote(button.dataset.id);
        });
    }
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