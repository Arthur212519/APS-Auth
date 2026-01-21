import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken"

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