require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DB connect
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(console.error);

// ✅ routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/postRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));

app.get("/", (req, res) => {
    res.send("AnonTalk API running 🚀");
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);