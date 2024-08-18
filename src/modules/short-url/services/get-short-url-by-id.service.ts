import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ShortUrlModel } from 'src/shared/database/models/short-url.model';
import { IShortUrlRepository } from 'src/shared/database/repositories/short-url.repository.interface';

@Injectable()
export class GetShortUrlByIdService {
  constructor(
    @Inject('ShortUrlRepository')
    private readonly shortUrlRepository: IShortUrlRepository,
  ) {}

  async execute(id: string): Promise<ShortUrlModel> {
    const shortUrl = await this.shortUrlRepository.findShortUrlById(id);

    if (!shortUrl) {
      throw new NotFoundException({
        message: `Short Url with id ${id} not found`,
      });
    }

    await this.shortUrlRepository.incrementAccessCount(id);
    return shortUrl;
  }
}
