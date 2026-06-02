# Talk-A-Tive 💬

A full-stack real-time chat application built with the MERN stack, Socket.IO, and Chakra UI. Talk-A-Tive enables users to connect instantly through one-to-one and group conversations with a modern, responsive interface.

## 🚀 Features

* Secure user authentication and authorization
* One-to-one private chats
* Group chat creation and management
* Real-time messaging with Socket.IO
* User search functionality
* JWT-based authentication
* Responsive UI built with Chakra UI
* MongoDB-powered data storage
* Persistent chat history
* Protected API routes

## 🛠️ Tech Stack

### Frontend

* React.js
* Chakra UI
* React Router
* Axios

### Backend

* Node.js
* Express.js
* Socket.IO

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt.js

## 📁 Project Structure

```text
Talk-A-Tive/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── data/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Archika2504/Talk-A-Tive
cd Talk-A-Tive
```

### Install Dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## ▶️ Run the Application

### Start Backend

```bash
npm run server
```

### Start Frontend

```bash
cd frontend
npm start
```

The application will run on:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

## 📡 API Routes

### User Routes

* `POST /api/user`
* `POST /api/user/login`
* `GET /api/user`

### Chat Routes

* `POST /api/chat`
* `GET /api/chat`
* `PUT /api/chat/grouprename`
* `PUT /api/chat/groupadd`
* `PUT /api/chat/groupremove`

### Message Routes

* `POST /api/message`
* `GET /api/message/:chatId`

## 🌟 Future Enhancements

* Message read receipts
* Typing indicators
* Image and file sharing
* Voice and video calling
* Push notifications
* Message reactions
* Online/offline presence tracking

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React, Node.js, Express, MongoDB, Socket.IO, and Chakra UI.
