import { Inject } from '@nestjs/common';

import { ShortUrlModel } from 'src/shared/database/models/short-url.model';
import { IShortUrlRepository } from 'src/shared/database/repositories/short-url.repository.interface';

export class GetShortUrlByUserIdService {
  constructor(
    @Inject('ShortUrlRepository')
    private readonly shortUrlRepository: IShortUrlRepository,
  ) {}

  async execute(
    id: string,
    page: number,
    limit: number,
  ): Promise<ShortUrlModel[]> {
    const shortUrls = await this.shortUrlRepository.findShortUrlsByUserId(
      id,
      page,
      limit,
    );

    return shortUrls;
  }
}
