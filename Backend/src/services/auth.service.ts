import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  if (!data.name || !data.email || !data.password) {
    const error = new Error('Missing required fields: name, email or password');
    (error as any).code = 'MISSING_FIELDS';
    throw error;
  }

  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) {
    const error = new Error(`User already exists with email: ${data.email}`);
    (error as any).code = 'USER_ALREADY_EXISTS';
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      phone: data.phone,
    },
  });

  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET!, {
    expiresIn: '15m',
  });

  const refreshTokenValue = crypto.randomUUID();
  await prisma.refreshToken.create({
    data: {
      token: refreshTokenValue,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ימים
    },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    accessToken,
    refreshToken: refreshTokenValue,
  };
}

export async function login(data: {
  email: string;
  password: string;
}) {
  if (!data.email || !data.password) {
    const error = new Error('Email and password are required');
    (error as any).code = 'MISSING_CREDENTIALS';
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    const error = new Error(`No user found with email: ${data.email}`);
    (error as any).code = 'USER_NOT_FOUND';
    throw error;
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    const error = new Error('Incorrect password');
    (error as any).code = 'INVALID_PASSWORD';
    throw error;
  }

  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET!, {
    expiresIn: '15m',
  });

  const refreshTokenValue = crypto.randomUUID();
  await prisma.refreshToken.create({
    data: {
      token: refreshTokenValue,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    accessToken,
    refreshToken: refreshTokenValue,
  };
}

export async function refreshToken(refreshToken: string) {
  if (!refreshToken) {
    const error = new Error('Refresh token is missing');
    (error as any).code = 'MISSING_REFRESH_TOKEN';
    throw error;
  }

  const tokenInDb = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!tokenInDb) {
    const error = new Error('Refresh token not found');
    (error as any).code = 'REFRESH_TOKEN_NOT_FOUND';
    throw error;
  }

  if (tokenInDb.revoked) {
    const error = new Error('Refresh token has been revoked');
    (error as any).code = 'REFRESH_TOKEN_REVOKED';
    throw error;
  }

  if (tokenInDb.expiresAt < new Date()) {
    const error = new Error('Refresh token expired');
    (error as any).code = 'REFRESH_TOKEN_EXPIRED';
    throw error;
  }

  const accessToken = jwt.sign(
    { userId: tokenInDb.user.id },
    JWT_SECRET!,
    { expiresIn: '15m' }
  );

  return { accessToken };
}
