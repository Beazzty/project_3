import jwt from 'jsonwebtoken';
import { Request } from 'express';

// Secret and expiration (you'll want to set process.env.JWT_SECRET in production)
const secret = process.env.JWT_SECRET || 'mysecretkey';
const expiration = '2h';

// Interface for payload structure
interface AuthPayload {
  _id: string;
  username: string;
  email: string;
}

// Middleware for authentication
export function authMiddleware({ req }: { req: Request & { user?: AuthPayload } }) {
  // Token can be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim();
  }

  if (!token) {
    return req;
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.user = decoded;
  } catch {
    console.log(req.headers.authorization)
    console.log('Invalid token');
  }

  return req;
}

// Function to sign token during login/signup
export function signToken({ _id, username, email }: AuthPayload) {
  const payload = { _id, username, email };
  return jwt.sign(payload, secret, { expiresIn: expiration });
}
