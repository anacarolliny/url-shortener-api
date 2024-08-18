import { Inject, Injectable } from '@nestjs/common';
import { CreateShortUrlDto } from 'src/shared/database/dtos/create-short-url.dto';
import { ShortUrlModel } from 'src/shared/database/models/short-url.model';
import { IShortUrlRepository } from 'src/shared/database/repositories/short-url.repository.interface';

@Injectable()
export class CreateShortUrlService {
  constructor(
    @Inject('ShortUrlRepository')
    private readonly shortnerRepository: IShortUrlRepository,
  ) {}

  async execute(data: CreateShortUrlDto): Promise<ShortUrlModel> {
    const shortUrl = await this.shortnerRepository.createShortUrl(data);

    return {
      shortUrl: shortUrl.shortUrl,
      originalUrl: shortUrl.originalUrl,
      clickCount: shortUrl?.clickCount,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl?.updatedAt,
      deletedAt: shortUrl?.deletedAt,
      userId: shortUrl?.userId,
    };
  }
}
