import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.get(
    '/private',
    authenticateToken,
    (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'usuario não autorizado' });
        }

        res.status(200).json({ message: 'voce está na rota privada' });
    }
);

router.get(
    '/protected',
    authenticateToken,
    authorizeRole('user'),
    (req, res) => {
        res.status(200).json({ message: 'bem vindo a rota protegida!' });
    }
);

export default router;
