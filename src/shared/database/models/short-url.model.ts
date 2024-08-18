import { UserModel } from './user.model';

export interface ShortUrlModel {
  id?: string;
  shortUrl: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  userId?: string;
  user?: UserModel | null;
}
