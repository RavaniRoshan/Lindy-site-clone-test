import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      reply.status(401).send({ success: false, error: 'Unauthorized - No token provided' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    (request as any).user = decoded;
  } catch (error) {
    reply.status(401).send({ success: false, error: 'Unauthorized - Invalid token' });
  }
}