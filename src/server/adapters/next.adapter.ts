import { NextServer } from 'next/dist/server/next';
import { Request, Response } from 'express';

export class NextAdapter {
  static configure(nextApp: NextServer) {
    const handle = nextApp.getRequestHandler();
    
    return (req: Request, res: Response, next: Function) => {
      // Check if the request is for the API routes
      if (req.path.startsWith('/api/') && !req.path.startsWith('/api/next/')) {
        // Continue to NestJS for API routes
        return next();
      }

      // Handle Next.js pages
      return handle(req, res);
    };
  }
}
