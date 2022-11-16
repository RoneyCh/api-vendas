import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const [, token] = authHeader.split(' ');  // Split the token from the Bearer

  try {
    // Verify the token
    const decodeToken = verify(token, authConfig.jwt.secret as string);

    const { sub } = decodeToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  }
  catch {
    throw new AppError('Invalid JWT token.');
  }

}