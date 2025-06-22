import jwt from "jsonwebtoken";
;
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export function generateToken(payload: object, expiresIn: string = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET as string);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
const REFRESH_TOKEN_EXPIRES_IN = "30d";
export function refreshToken(oldToken: string) {
  try {
    const decoded = jwt.verify(oldToken, JWT_SECRET) as jwt.JwtPayload;

    // הסר שדות שלא רוצים לשכפל, כמו iat ו־exp
    const { iat, exp, ...payload } = decoded;

    // צור טוקן חדש עם אותם פרטים
    const newToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return newToken;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
}
