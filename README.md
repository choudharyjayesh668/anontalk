# 🚀 AnonTalk — Anonymous Group Chat Application

AnonTalk is a full-stack web application that allows users to create groups and chat anonymously. It includes secure authentication, protected routes using JWT, and a clean responsive UI.

This project demonstrates full-stack development using Node.js, Express, MongoDB, and vanilla JavaScript.

---

## ✨ Features

* 🔐 User Registration & Login
* 👥 Create and Delete Groups
* 💬 Anonymous Group Chat
* 🛡️ JWT Authentication & Protected Routes
* 🎨 Responsive Frontend UI
* ⚡ REST API Architecture

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

---

## 📁 Project Structure

```
anontalk/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── group.html
│   └── ...
│
└── README.md
```

---

## 🚀 Quick Start (Run Locally)

### 1️⃣ Clone the repository

```
git clone https://github.com/choudharyjayesh668/anontalk.git
cd anontalk
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

---

### 3️⃣ Create Environment File

Inside the **backend** folder, create a file named:

```
.env
```

Copy from `.env.example` and fill your values:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Start MongoDB

Make sure MongoDB is running locally:

```
mongod
```

---

### 5️⃣ Run the Server

```
node server.js
```

Server will start at:

```
http://localhost:5000
```

---

### 6️⃣ Run Frontend

Open directly in browser:

```
frontend/index.html
```

Or use **Live Server** in VS Code.

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. JWT token stored in localStorage
4. Protected pages verify token
5. User accesses group chat

---

## 🧪 How to Test

* Register a new account
* Login
* Create a group
* Open group chat
* Send messages
* Delete group

---

## 🚀 Future Improvements

* 🔴 Real-time chat with Socket.io
* 🟢 Online users indicator
* 🌓 Dark mode
* 📱 Mobile UI improvements
* ⏱️ Message timestamps

---

## 👨‍💻 Author

**Jayesh Choudhary**
BCA Final Year
Aspiring Software Developer 🚀

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
## 🧑‍💻 How to Run This Project (Beginner Friendly)

Follow these steps carefully to run the project on your computer.

---

### ✅ Step 0: Install Required Software

Make sure you have installed:

* Node.js (v16 or higher)
* MongoDB (local) **OR** MongoDB Atlas
* Git
* VS Code (recommended)

Check installation:

```bash
node -v
npm -v
git --version
```

---

### ✅ Step 1: Clone the Repository

Open terminal and run:

```bash
git clone https://github.com/choudharyjayesh668/anontalk.git
```

Move into project folder:

```bash
cd anontalk
```

---

### ✅ Step 2: Install Backend Dependencies

Go to backend folder:

```bash
cd backend
```

Install packages:

```bash
npm install
```

⏳ Wait until installation completes.

---

### ✅ Step 3: Create Environment File

Inside the **backend** folder:

1. Create a new file named:

```
.env
```

2. Copy content from `.env.example`

3. Replace with your values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

⚠️ **Important:** Server will NOT run without this step.

---

### ✅ Step 4: Start MongoDB

#### 👉 If using local MongoDB

Open new terminal and run:

```bash
mongod
```

Keep it running.

#### 👉 If using MongoDB Atlas

Just make sure your Atlas connection string is correct.

---

### ✅ Step 5: Start Backend Server

In backend terminal:

```bash
node server.js
```

✅ You should see something like:

```
Server running on port 5000
MongoDB connected
```

---

### ✅ Step 6: Open Frontend

Go to project folder → open in browser:

```
frontend/index.html
```

**OR (recommended)**

Use VS Code Live Server.

---

## 🎉 You’re Done!

Now you can:

* Register a user
* Login
* Create group
* Chat anonymously
* Delete group

---

## 🆘 Common Errors & Fixes

### ❌ MongoDB not connected

✔️ Make sure `mongod` is running
✔️ Check your `MONGO_URI`

---

### ❌ npm install fails

✔️ Delete `node_modules` and run again
✔️ Check Node version

---

### ❌ Port already in use

✔️ Change PORT in `.env`

---

## ⚡ Super Quick Run (For Experts)

```bash
git clone https://github.com/choudharyjayesh668/anontalk.git
cd anontalk/backend
npm install
node server.js
```

Then open:

```
frontend/index.html
```
