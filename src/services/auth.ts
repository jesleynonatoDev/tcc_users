import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';

export interface JwtToken {
    sub: string;
}

export default class AuthService {
  public static async hashedPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(sub: string): string {
      return jwt.sign(
        { sub }, 'some-key',
        { expiresIn: config.get('App.auth.tokenExpiresIn') }
      );
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, config.get('App.auth.key')) as JwtToken;
  }
}