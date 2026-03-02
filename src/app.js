import "./config/env.js";

import express from "express";
const app = express();

import connectDB from "./config/db.js";
connectDB();

import cors from "cors";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";



// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


import { globalHandler } from "./middlewares/errorMiddleware.js";
import  AppError  from "./utils/appError.js";

import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import tourRoutes from "./routes/tourRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(xss());
app.use(mongoSanitize());

// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "../uploads"))
// );


app.use((req, res, next)=>{
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1', authRoutes);

app.use('/api/v1', homeRoutes);

app.use('/api/v1', tourRoutes);

app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);


app.use((req, res, next)=>{
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalHandler);

// app.all('*',(req, res, next)=>{
//   next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
// });

export default app;