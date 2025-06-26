import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticateJWT';

 const authorizeAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: 'Access denied. Admins only.' });
    return; 
  }
  next(); 
  
};
export default authorizeAdmin;