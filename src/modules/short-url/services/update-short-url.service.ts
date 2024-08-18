import { Inject, NotFoundException } from '@nestjs/common';
import { UserModel } from 'src/shared/database/models/user.model';
import { IShortUrlRepository } from 'src/shared/database/repositories/short-url.repository.interface';

export class UpdateShortUrlService {
  constructor(
    @Inject('ShortUrlRepository')
    private readonly shortRepository: IShortUrlRepository,
  ) {}

  async execute(
    id: string,
    originalUrl: string,
    user?: UserModel,
  ): Promise<void> {
    const shortUrl = await this.shortRepository.findShortUrlById(id);

    if (!shortUrl) {
      throw new NotFoundException({
        message: `Shortned Url with id ${id} not found`,
      });
    }

    if (shortUrl.userId !== user.id) {
      throw new NotFoundException({
        message: 'You are not allowed to update this Shortned url',
      });
    }

    await this.shortRepository.updateShortUrl(id, {
      originalUrl: originalUrl,
    });
  }
}
