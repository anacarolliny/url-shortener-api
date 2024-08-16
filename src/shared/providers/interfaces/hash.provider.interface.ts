export interface IHashProvider {
  createHash(password: string): Promise<string>;
  compareHash(password: string, hashed: string): Promise<boolean>;
}
