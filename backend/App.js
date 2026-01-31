import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

export default app;