const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./users");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://code-quick-backend:ft3bYrVwjWqc6qV8@blog-app-cluster.crfrsjc.mongodb.net/").then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// GET users endpoint
app.get("/", (req, res) => {
    UserModel.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ error: err.message }));
});
app.get("/getUser/:id", (req, res) => {
    UserModel.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: err.message }));
});


// POST createUser endpoint
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// PUT updateUser endpoint
app.put("/updateUser/:id", (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/deleteUser/:id", (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "User deleted successfully!" }))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
