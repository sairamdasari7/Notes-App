document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:5000/api';
    let token = localStorage.getItem('token');

    const showAuth = () => {
        document.getElementById('auth').style.display = 'block';
        document.getElementById('notes').style.display = 'none';
    };

    const showNotes = () => {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('notes').style.display = 'block';
        fetchNotes();
    };

    const checkAuth = () => {
        if (token) {
            showNotes();
        } else {
            showAuth();
        }
    };

    const fetchNotes = () => {
        fetch(`${apiUrl}/notes`, {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => response.json())
        .then(notes => {
            renderNotes(notes);
        })
        .catch(() => {
            alert('Failed to fetch notes');
        });
    };

    const renderNotes = (notes) => {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.style.backgroundColor = note.color;
            noteDiv.innerHTML = `
                <div class="note-header">
                    <h3>${note.title}</h3>
                    <button class="delete-note" data-id="${note._id}">Delete</button>
                </div>
                <p>${note.content}</p>
                <div class="note-tags">${note.tags.join(', ')}</div>
                <div class="note-color">Color: ${note.color}</div>
                <div class="note-reminder">Reminder: ${new Date(note.reminder).toLocaleString()}</div>
            `;
            notesList.appendChild(noteDiv);
        });

        document.querySelectorAll('.delete-note').forEach(button => {
            button.addEventListener('click', function() {
                const noteId = this.getAttribute('data-id');
                deleteNote(noteId);
            });
        });
    };

    const deleteNote = (noteId) => {
        fetch(`${apiUrl}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        })
        .then(() => {
            fetchNotes();
        })
        .catch(() => {
            alert('Failed to delete note');
        });
    };

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            token = data.token;
            localStorage.setItem('token', token);
            showNotes();
        })
        .catch(() => {
            alert('Login failed');
        });
    });

    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            token = data.token;
            localStorage.setItem('token', token);
            showNotes();
        })
        .catch(() => {
            alert('Registration failed');
        });
    });

    document.getElementById('create-note-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const tags = document.getElementById('note-tags').value.split(',').map(tag => tag.trim());
        const color = document.getElementById('note-color').value;
        const reminder = document.getElementById('note-reminder').value;

        fetch(`${apiUrl}/notes`, {
            method: 'POST',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, tags, color, reminder })
        })
        .then(() => {
            fetchNotes();
            document.getElementById('create-note-form').reset();
        })
        .catch(() => {
            alert('Failed to create note');
        });
    });

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        token = null;
        showAuth();
    });

    checkAuth();
});
