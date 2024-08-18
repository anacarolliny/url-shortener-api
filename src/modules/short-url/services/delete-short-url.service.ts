import { Inject, NotFoundException } from '@nestjs/common';
import { UserModel } from 'src/shared/database/models/user.model';
import { IShortUrlRepository } from 'src/shared/database/repositories/short-url.repository.interface';

export class DeleteShortUrlService {
  constructor(
    @Inject('ShortUrlRepository')
    private readonly shortUrlRepository: IShortUrlRepository,
  ) {}

  async execute(id: string, user: UserModel): Promise<void> {
    const shortnedUrl = await this.shortUrlRepository.findShortUrlById(id);

    if (!shortnedUrl) {
      throw new NotFoundException({
        message: `Short Url with id ${id} not found`,
      });
    }

    if (shortnedUrl.userId !== user.id) {
      throw new NotFoundException({
        message: `You are not allowed to delete this shortned url`,
      });
    }

    await this.shortUrlRepository.softDeleteShortUrl(id);
  }
}
