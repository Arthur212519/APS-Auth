import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {

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