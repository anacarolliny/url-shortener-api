import { CreateShortUrlDto } from '../dtos/create-short-url.dto';
import { UpdateShortUrlDto } from '../dtos/update-short-url.dto';
import { ShortUrlModel } from '../models/short-url.model';

export interface IShortUrlRepository {
  createShortUrl(data: CreateShortUrlDto): Promise<ShortUrlModel>;
  findShortUrlByCode(shortUrl: string): Promise<ShortUrlModel | null>;
  findShortUrlsByUserId(userId: string): Promise<ShortUrlModel[]>;
  updateShortUrl(id: string, data: UpdateShortUrlDto): Promise<ShortUrlModel>;
  deleteShortUrl(id: string): Promise<void>;
  findShortUrlById(id: string): Promise<ShortUrlModel | null>;
  softDeleteShortUrl(id: string): Promise<void>;
  incrementAccessCount(id: string): Promise<void>;
  findOriginalUrlAndIncrementClick(
    shortUrl: string,
  ): Promise<ShortUrlModel | null>;
}
