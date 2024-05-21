import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./src/config/db.config.js";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";
import userRouter from "./src/routes/user.routes.js";
import session from "express-session";
import passport from "./src/config/passport.config.js";
import propertyRouter from "./src/routes/property.routes.js";
// Load environment variables
dotenv.config();


// Enable all cors requests
const app = express();
app.use(cors());
// app.use(
//   cors(
//     {
//     origin: ["https://rent-app-nine.vercel.app/"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   }
// ));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const corsOptions = ;



// Preflight request handling for all routes
// app.options("*", cors(corsOptions));

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "adfjlhadfajdhf", // Use a secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRouter);
app.use("/api/properties", propertyRouter);

// Global error handling middleware
app.use(errorHandler);

// Define port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToDB();
});
