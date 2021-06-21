import { scryptSync, randomBytes } from 'crypto';

export class Hash {
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const derivedKey = await scryptSync(password, salt, 12);
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  static async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const [salt, key] = hash.split(':');
    try {
      const derivedKey = await scryptSync(password, salt, 12);
      return key === derivedKey.toString('hex');
    } catch (e) {
      return false;
    }
  }
}
