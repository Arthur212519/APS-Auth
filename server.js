import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());


const users = [
  { id: 1, username: 'numeasda', password: 'asddfsd', role: 'admin' },

  { id: 2, username: 'joaosilva', password: '123456', role: 'user' },
  { id: 3, username: 'mariasantos', password: 'senhaSegura', role: 'user' },
  { id: 4, username: 'adminmaster', password: 'admin123', role: 'admin' },
  { id: 5, username: 'lucaspereira', password: 'lucas789', role: 'user' },
  { id: 6, username: 'anacosta', password: 'ana456', role: 'user' }
];

//rota para realizar auth

//Middleware para autenticar o token
const authenticateToken = (req,res,next) => {
    
    const authHeader = req.headers['authorization'];
    
    if(!authHeader) return res.status(401).json({message:'token não fornecido'});
    
    const [, token] = authHeader.split(' ');
    
    if(!token) {
        return res.status(401).json({message:'token mal formado'})
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{

        if(err){
            return res.status(401).json({message:"token inválido ou expirado"})
        } 
        req.user = user;
        next();
    })
}

const authrizeRole = (role) => {
    return (req,res,next) => {
        if(req.user.role !== role) {
            return res.status(403).json({message:"acesso negado"});
        }
        next();
    };
};

const loginLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max:5,
    standardHeaders: true,
    legacyHeaders : true,
    message:{message:'muitas tentativas, tente novamente mais tarde'}

});
//rota autenticada

app.get('/private', authenticateToken, (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({message:'usuario não autorizado'});
    }
    res.status(200).json({message:'voce está na rota privada'});
})

app.post('/login',loginLimiter, (req,res) => {
    const {username, password} = req.body;
    
    //checar se existe no banco o username e a senha
    if (!username || !password) {
        return res.status(400).json({ message: 'dados inválidos' });
    }
    
    const user = users.find(user => user.username ===username && user.password ===password);
    
    if (user) {
        const token = jwt.sign({sub: user.id,role: user.role }, process.env.SECRET_KEY,{expiresIn:'15m'}) 
        res.status(201).json({message:token});
    } else {
        res.status(401).json({message:"usuário ou senha inválido"});
    }
})
app.get('/protected', authenticateToken,authrizeRole('admin'), (req, res) => {
    res.status(200).json({message:'bem vindo a rota protegida!'});
})

// rota privada



app.listen(process.env.PORT, () => {
    console.log("servidor rodando")
})



