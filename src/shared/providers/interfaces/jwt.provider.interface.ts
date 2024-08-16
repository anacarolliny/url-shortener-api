export interface IJwtProvider {
  encryptToken(plaintext: Record<string, any>): Promise<string>;
  getExpirationDate(ciphertext: string): Promise<Date>;
}
