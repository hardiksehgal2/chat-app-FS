// backend\src\index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.route");
const connectDB = require("./lib/db");

dotenv.config();
const app = express();

// Parse JSON bodies
// extract json data from request body
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
// Parse URL-encoded bodies
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cookie",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

const PORT = process.env.PORT || 5001;
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
  connectDB();
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Please try another port.`);
  } else {
    console.log('An error occurred:', err);
  }
});