require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const taskRoutes = require("./src/routes/task");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] },
});

io.on("connection", (socket) => {
  socket.on("join", (userId) => socket.join(userId));
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => console.log("🚀 Server + Socket running on", PORT));
});
