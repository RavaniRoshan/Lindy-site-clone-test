import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { RegisterInput, LoginInput } from './schemas';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export class AuthService {
  async register(data: RegisterInput) {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return { user, message: 'Registration successful. Please check your email.' };
  }

  async login(data: LoginInput) {
    // Find user
    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 900, // 15 minutes
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };

      // Find refresh token in database
      const storedToken = await db.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.userId !== decoded.userId || storedToken.expiresAt < new Date()) {
        throw new Error('Invalid or expired refresh token');
      }

      // Generate new tokens
      const accessToken = this.generateAccessToken(decoded.userId);
      const newRefreshToken = await this.generateRefreshToken(decoded.userId);

      // Remove old refresh token
      await db.refreshToken.delete({
        where: { id: storedToken.id },
      });

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
        expires_in: 900,
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async logout(refreshToken: string) {
    await db.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  async getUserById(userId: string) {
    return await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Store refresh token in database
    await db.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return token;
  }
}

export const authService = new AuthService();