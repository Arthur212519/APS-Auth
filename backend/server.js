import dotenv from "dotenv"
import app from './App.js'
/*
import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import helmet from 'helmet';
import authRoutes from "./routes/auth.routes.js"
import protectedRoutes from "./routes/protected.routes.js"

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173"
}));



app.use('/auth', authRoutes);

app.use('/protected', protectedRoutes)*/

dotenv.config();


app.listen(process.env.PORT, () => {
    console.log("servidor rodando")
})



