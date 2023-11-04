const app = {
    data: {
        url: "http://localhost:3000/notes",
        notes:[]
        
    },
//methods
    getNotes: function() { 
        /* let container = document.getElementById('container') */
        fetch(this.data.url, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(r => r.json())
        .then(response => {
           for (let note of response) {
            this.data.notes.push(note)
           };
           this.generateNotesHTML()
        })
    },

/* createNote: function(noteId) { 
    fetch(this.data.url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
        body: JSON.stringify({"title": "Hi", "body": "COOL"})
    })
    .then(r => r.json())
    .then(response => {
        //finish
        this.generateNotesHTML()
    }) */
},

/* displayCreateForm: function() {},
//displays blank form */

/* deleteNote: function(noteId) { //from class 11-2
    fetch(this.data.url + noteId, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })
    .then(r => r.json())
    .then(response => {
        //finish delete object from this.data.notes with id (with 'if')
        this.generateNotesHTML()
    })
}, */


/* confirmDelete: function() {},
//display confirmation popup, call deleteNote
editNote:function(id) {},
// call displayEditForm, saves/overwrites note (request)

displayEditForm: function(note) {
    let form = document.getElementById('editForm');
     form.classList.remove('hidden') //with eventlistener to remove hidden
    //this should just be a variation of the display create form, but prepopulated
}, */

    generateNotesHTML function() {
        const noteContainer = document.getElementById('container');
        for (let note of this.data.notes) {
        noteContainer.innerHTML += `
        <div class="noteCard">
            <div>${note.title}</div>
            <div>${note.body}</div>
            <button class="editButton data-id=${note.id}>Edit</button>
            <button class="deleteButton data-id=${note.id}>Delete</button>
        </div>
        `}
        this.addEventListeners();
    },
//notes added from 11-2
    addEventListeners: function() {
        let deleteButtons = document.querySelectorAll('.deleteButton');
        console.log(deleteButtons);
for (let button of deleteButtons) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
    })   
}
    },

    main: function() {
        //call getNotes(), set up event listeners (will contain if statements,
        //or other code to call when a user clicks edit, delete or create)
        //use event.preventDefault();
        
        this.getNotes();
    
    then.deleteNotes();
        
    //eventListener: editNote(event.target.data-id)
    
    
    app.main() //was getNotes
        
}
}