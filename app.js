import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './src/config/db.config.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';
import userRouter from './src/routes/user.routes.js';
import session from 'express-session';
import passport from './src/config/passport.config.js';
import propertyRouter from './src/routes/property.routes.js';
// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable all cors requests
app.use(cors());

const corsOptions = {
  origin: "https://rent-app-nine.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Preflight request handling for all routes
app.options('*', cors(corsOptions));

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'adfjlhadfajdhf', // Use a secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);

// Global error handling middleware
app.use(errorHandler);

// Define port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToDB();
});
