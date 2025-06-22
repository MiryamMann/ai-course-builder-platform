import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      phone: data.phone,
    },
  });

  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });

  const refreshTokenValue = crypto.randomUUID();
  await prisma.refreshToken.create({
    data: {
      token: refreshTokenValue,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ימים
    },
  });

  return { user, accessToken, refreshToken: refreshTokenValue };
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });

  const refreshTokenValue = crypto.randomUUID();
  await prisma.refreshToken.create({
    data: {
      token: refreshTokenValue,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  return { user, accessToken, refreshToken: refreshTokenValue };
}

export async function refreshToken(refreshToken: string) {
  const tokenInDb = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!tokenInDb || tokenInDb.revoked || tokenInDb.expiresAt < new Date()) {
    throw new Error('Invalid or expired refresh token');
  }

  const accessToken = jwt.sign(
    { userId: tokenInDb.user.id },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken };
}
