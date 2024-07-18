$(document).ready(function() {
    const apiUrl = 'http://localhost:5000/api';
    let token = localStorage.getItem('token');

    const showAuth = () => {
        $('#auth').show();
        $('#notes').hide();
    };

    const showNotes = () => {
        $('#auth').hide();
        $('#notes').show();
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
        $.ajax({
            url: `${apiUrl}/notes`,
            method: 'GET',
            headers: {
                'x-auth-token': token
            },
            success: (notes) => {
                renderNotes(notes);
            },
            error: () => {
                alert('Failed to fetch notes');
            }
        });
    };

    const renderNotes = (notes) => {
        $('#notes-list').empty();
        notes.forEach(note => {
            $('#notes-list').append(`
                <div class="note" style="background-color: ${note.color}">
                    <div class="note-header">
                        <h3>${note.title}</h3>
                        <button class="delete-note" data-id="${note._id}">Delete</button>
                    </div>
                    <p>${note.content}</p>
                    <div class="note-tags">${note.tags.join(', ')}</div>
                    <div class="note-color">Color: ${note.color}</div>
                    <div class="note-reminder">Reminder: ${new Date(note.reminder).toLocaleString()}</div>
                </div>
            `);
        });
        $('.delete-note').click(function() {
            const noteId = $(this).data('id');
            deleteNote(noteId);
        });
    };

    const deleteNote = (noteId) => {
        $.ajax({
            url: `${apiUrl}/notes/${noteId}`,
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            },
            success: () => {
                fetchNotes();
            },
            error: () => {
                alert('Failed to delete note');
            }
        });
    };

    $('#login-form').submit(function(e) {
        e.preventDefault();
        const email = $('#login-email').val();
        const password = $('#login-password').val();
        $.ajax({
            url: `${apiUrl}/auth/login`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: (data) => {
                token = data.token;
                localStorage.setItem('token', token);
                showNotes();
            },
            error: () => {
                alert('Login failed');
            }
        });
    });

    $('#register-form').submit(function(e) {
        e.preventDefault();
        const name = $('#register-name').val();
        const email = $('#register-email').val();
        const password = $('#register-password').val();
        $.ajax({
            url: `${apiUrl}/auth/register`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name, email, password }),
            success: (data) => {
                token = data.token;
                localStorage.setItem('token', token);
                showNotes();
            },
            error: () => {
                alert('Registration failed');
            }
        });
    });

    $('#create-note-form').submit(function(e) {
        e.preventDefault();
        const title = $('#note-title').val();
        const content = $('#note-content').val();
        const tags = $('#note-tags').val().split(',').map(tag => tag.trim());
        const color = $('#note-color').val();
        const reminder = $('#note-reminder').val();
        $.ajax({
            url: `${apiUrl}/notes`,
            method: 'POST',
            headers: {
                'x-auth-token': token
            },
            contentType: 'application/json',
            data: JSON.stringify({ title, content, tags, color, reminder }),
            success: () => {
                fetchNotes();
                $('#create-note-form')[0].reset();
            },
            error: () => {
                alert('Failed to create note');
            }
        });
    });

    $('#logout').click(function() {
        localStorage.removeItem('token');
        token = null;
        showAuth();
    });

    checkAuth();
});
