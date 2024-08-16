import { ShortUrlModel } from './short-url.model';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  shortUrls?: ShortUrlModel[];
}
