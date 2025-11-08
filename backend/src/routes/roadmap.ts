import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { llmService } from '../services/llmService';
import { GenerateRoadmapRequestSchema } from '../utils/validators';
import { ZodError } from 'zod';

const router = Router();

interface CustomError extends Error {
  statusCode?: number;
}

router.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const validatedData = GenerateRoadmapRequestSchema.parse(req.body);

    // Generate roadmap
    const roadmap = await llmService.generateRoadmap(validatedData.topic);

    res.status(200).json(roadmap);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = new Error(
        (error as any).errors?.[0]?.message || 'Validation failed'
      ) as CustomError;
      validationError.statusCode = 400;
      return next(validationError);
    }

    if (error instanceof Error) {
      const customError = error as CustomError;
      customError.statusCode = customError.statusCode || 500;
      return next(customError);
    }

    next(new Error('Unknown error occurred'));
  }
});

export default router;
