import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import cors from "cors"
import helmet from 'helmet';
import { pool } from './db/index.js';

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173"
}));


//rota para realizar auth

//Middleware para autenticar o token
const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ message: 'token não fornecido' });

    const [, token] = authHeader.split(' ');

    if (!token) {
        return res.status(401).json({ message: 'token mal formado' })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

        if (err) {
            return res.status(401).json({ message: "token inválido ou expirado" })
        }
        req.user = user;
        next();
    })
}

const authrizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "acesso negado" });
        }
        next();
    };
};

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: true,
    message: { message: 'muitas tentativas, tente novamente mais tarde' }

});
//rota autenticada

app.get('/private', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'usuario não autorizado' });
    }
    res.status(200).json({ message: 'voce está na rota privada' });
})

app.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    //checar se existe no banco o username e a senha
    if (!username || !password) {
        return res.status(400).json({ message: 'dados inválidos' });
    }

    const result = await pool.query("SELECT id, username, password_hash, role FROM users WHERE username = $1",
        [username]
    );

    const user = result.rows[0];

    if (!user) {
        return res.status(401).json({ message: "usuário ou senha inválido" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        return res.status(401).json({ message: "usuário ou senha inválido" });
    }


    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.SECRET_KEY,
        { expiresIn: '15m' }
    );
    return res.status(200).json({ token });
});
app.get('/protected', authenticateToken, authrizeRole('admin'), (req, res) => {
    res.status(200).json({ message: 'bem vindo a rota protegida!' });
})

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'dados inválidos' });
        }

        //verificar se usuário existe
        const userExists = await pool.query(`SELECT 1 FROM users WHERE username =$1`,
            [username]
        );

        if (userExists.rowCount > 0) {
            return res.status(409).json({ message: 'usuário já cadastrado' });
        }
            //hash senha
        const passwordHash = await bcrypt.hash(password, 10);

            //criar usuario 
        await pool.query(`
                INSERT INTO users (username, password_hash, role) VALUES($1, $2, $3)`,
                [username, passwordHash, 'user']
        );

        return res.status(201).json({ message: "usuario cadastrado" });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'erro interno do servidor' });
    }
});

// rota privada



app.listen(process.env.PORT, () => {
    console.log("servidor rodando")
})



