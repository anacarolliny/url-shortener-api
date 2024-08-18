import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IShortUrlRepository } from 'src/shared/database/repositories/short-url.repository.interface';

@Injectable()
export class GetOriginalUrlByShortService {
  constructor(
    @Inject('ShortUrlRepository')
    private readonly shortUrlRepository: IShortUrlRepository,
  ) {}

  async execute(shortUrl: string): Promise<string> {
    const url =
      await this.shortUrlRepository.findOriginalUrlAndIncrementClick(shortUrl);
    if (!url) {
      throw new NotFoundException({
        message: `Original Url with short url ${url} not found`,
      });
    }
    return url.originalUrl;
  }
}
