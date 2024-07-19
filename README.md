# Notes App

A simple desktop web application for keeping notes, inspired by Google Keep. The application allows users to create, edit, and delete notes, and includes features such as user authentication, note tagging, color coding, and reminders.

## Features

- **User Authentication and Content Sync**: Register and log in to sync your notes across devices.
- **Create a New Note**: Add new notes with a title, content, tags, color, and optional reminder.
- **Search in Your Notes**: Search for specific notes by title or content.
- **Label View**: View all notes tagged with a specific label.
- **Archived Notes**: Archive notes to keep them separate from active notes.
- **Multiple Tags**: Assign up to 9 tags to a single note.
- **Toggle Background Colors**: Change the background color of a note.
- **Trash Notes**: View and restore notes deleted in the last 30 days.
- **Reminder View**: View all notes with an upcoming due date (Bonus feature).

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (no frontend framework), Fetch API for AJAX requests.
- **Backend**: Node.js, Express.js for server and API handling, MongoDB for database.
- **Authentication**: JWT (JSON Web Tokens).
- **Styling**: Custom CSS for responsive design across small, medium, large, and extra-large devices.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server running locally or an accessible MongoDB Atlas instance.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
2. **Install backend dependencies:**:
   ```bash
   cd backend
   npm install
3. **Create a .env file in the backend directory and add the following:**:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
4. **Run the backend server:**:
   ```bash
    npm start
   The backend server will start on http://localhost:5000.
5. **Open the frontend:**:   
   Open index.html in your browser (or use a local server such as Live Server in VSCode).


### Usage
1. Register and Log In:

   - Register a new user and log in to access the notes functionality.
   
3. Create, Edit, and Delete Notes:

   - Use the form to create new notes.
   - View, edit, and delete existing notes.

4. Tagging and Color Coding:

   - Add tags and change the background color of your notes.
   
5.  Search and Filter:

   - Use the search functionality to find specific notes.
   - Filter notes by tags and archived status.

### Notes
    
    - CORS Configuration: Ensure that the backend server is configured to allow CORS requests from your frontend's origin.
    - Responsive Design: The application is designed to be responsive and work across different screen sizes.

### License
    - This project is licensed under the MIT License.

### Acknowledgments
    - Inspired by Google Keep.
    - 
This `README.md` provides an overview of the project, installation instructions, usage guidelines, project structure, and additional notes. Adjust the repository URL and any other project-specific details as needed.



