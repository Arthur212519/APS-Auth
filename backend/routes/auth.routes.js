import { loginLimiter } from "../middlewares/rateLimit.js";
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
/*
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { pool } from "../db/index.js";
*/


const router = Router();

router.post('/login', loginLimiter, login);
router.post('/register', register);








/*router.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    //checar se existe no banco o username e a senha
    if (!username || !password) {
        return res.status(400).json({ message: 'dados inválidos' });
    }

    let result ;

    try {
          result = await pool.query("SELECT id, username, password_hash, role FROM users WHERE username = $1",
         [username]
        );
    } catch (err){
        return res.status(500).json({message:"erro no banco de dados"})
    }
    
     const user =  result.rows[0];

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

//Register

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'dados inválidos' });
        }

        if(!email.includes('@')) {
            return res.status(400).json({message:'email inválido'});
        }

        //verificar se usuário e email existe
        const userExists = await pool.query(`SELECT 1,2 FROM users WHERE username =$1 OR email =$2`,
            [username,email]
        );

        if (userExists.rowCount > 0) {
            return res.status(409).json({ message: 'usuário já cadastrado' });
        }
            //hash senha
        const passwordHash = await bcrypt.hash(password, 10);

            //criar usuario 
        await pool.query(`
                INSERT INTO users (username, password_hash,email, role) VALUES($1, $2, $3, $4)`,
                [username, passwordHash, email, 'user']
        );

        return res.status(201).json({ message: "usuario cadastrado" });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'erro interno do servidor' });
    }
});*/

export default router;