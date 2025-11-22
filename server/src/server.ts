import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { authRoutes } from './auth.routes';
import { authenticate } from './auth.middleware';

const server = Fastify({
  logger: true,
});

// Register plugins
server.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
});

server.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-min-32-chars',
});

server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

// Add authentication decorator
server.decorate('authenticate', authenticate);

// Health check endpoint
server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register authentication routes
server.register(authRoutes);

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001', 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();