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


//rota para realizar auth
//rota autenticada
app.use('/auth', authRoutes);

app.use('/protected', protectedRoutes)

/*app.get('/private', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'usuario não autorizado' });
    }
    res.status(200).json({ message: 'voce está na rota privada' });
})


app.get('/protected', authenticateToken, authorizeRole('user'), (req, res) => {
    res.status(200).json({ message: 'bem vindo a rota protegida!' });
})*/

// rota privada



app.listen(process.env.PORT, () => {
    console.log("servidor rodando")
})



