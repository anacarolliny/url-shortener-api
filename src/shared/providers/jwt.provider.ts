import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtProvider } from './interfaces/jwt.provider.interface';
import {} from 'src/config/jwt-config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtProvider implements IJwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  async encryptToken(plaintext: Record<string, any>): Promise<string> {
    return this.jwtService.sign({ ...plaintext });
  }

  async getExpirationDate(ciphertext: string): Promise<Date> {
    const { exp } = await this.decryptToken(ciphertext);
    return new Date(exp * 1000);
  }

  async decryptToken(ciphertext: string): Promise<jwt.JwtPayload> {
    return this.jwtService.verify(ciphertext) as jwt.JwtPayload;
  }
}
