import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // או טיפוס מדויק יותר
    }
  }
}
