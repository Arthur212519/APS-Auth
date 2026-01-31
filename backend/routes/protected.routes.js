import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.get(
    '/private',
    authenticateToken,authorizeRole('admin'),
    (req, res) => {
        res.status(200).json({ message: 'voce está na rota privada' });
    }
);

router.get(
    '/protected',
    authenticateToken,
    (req, res) => {
        res.status(200).json({ message: 'bem vindo a rota protegida!' });
    }
);

export default router;
