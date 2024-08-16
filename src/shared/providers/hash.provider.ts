import { Injectable } from '@nestjs/common';
import { IHashProvider } from './interfaces/hash.provider.interface';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashProvider implements IHashProvider {
  async createHash(password: string): Promise<string> {
    return hash(password, 14);
  }

  async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }
}
