import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import roadmapRoutes from './routes/roadmap';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/roadmap', roadmapRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
