import { FastifyInstance } from 'fastify';
import { authService } from './auth.service';
import { registerSchema, loginSchema, refreshTokenSchema } from './schemas';

export async function authRoutes(fastify: FastifyInstance) {
  // Register endpoint
  fastify.post('/api/auth/register', {
    schema: {
      body: registerSchema,
    },
  }, async (request, reply) => {
    try {
      const result = await authService.register(request.body as any);
      reply.status(201).send(result);
    } catch (error) {
      fastify.log.error(error);
      if (error instanceof Error) {
        if (error.message === 'Email already exists') {
          reply.status(400).send({ success: false, error: error.message });
        } else {
          reply.status(500).send({ success: false, error: 'Registration failed' });
        }
      } else {
        reply.status(500).send({ success: false, error: 'Database error' });
      }
    }
  });

  // Login endpoint
  fastify.post('/api/auth/login', {
    schema: {
      body: loginSchema,
    },
  }, async (request, reply) => {
    try {
      const result = await authService.login(request.body as any);
      reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      if (error instanceof Error && error.message === 'Invalid credentials') {
        reply.status(401).send({ success: false, error: error.message });
      } else {
        reply.status(500).send({ success: false, error: 'Login failed' });
      }
    }
  });

  // Refresh token endpoint
  fastify.post('/api/auth/refresh', {
    schema: {
      body: refreshTokenSchema,
    },
  }, async (request, reply) => {
    try {
      const result = await authService.refreshToken((request.body as any).refresh_token);
      reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      reply.status(401).send({ success: false, error: 'Invalid or expired refresh token' });
    }
  });

  // Logout endpoint
  fastify.post('/api/auth/logout', {
    schema: {
      body: refreshTokenSchema,
    },
  }, async (request, reply) => {
    try {
      await authService.logout((request.body as any).refresh_token);
      reply.send({ success: true, message: 'Logout successful' });
    } catch (error) {
      fastify.log.error(error);
      reply.send({ success: true, message: 'Logout successful' }); // Always success for logout
    }
  });

  // Get current user endpoint
  fastify.get('/api/auth/me', {
    onRequest: [fastify.authenticate],
  }, async (request, reply) => {
    try {
      const userId = (request as any).user?.userId;
      if (!userId) {
        reply.status(401).send({ success: false, error: 'Unauthorized' });
        return;
      }

      const user = await authService.getUserById(userId);
      if (!user) {
        reply.status(401).send({ success: false, error: 'User not found' });
        return;
      }

      reply.send({ user });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ success: false, error: 'Failed to fetch user data' });
    }
  });
}