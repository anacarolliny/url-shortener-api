import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShortUrlModel } from '../../models/short-url.model';
import { CreateShortUrlDto } from '../../dtos/create-short-url.dto';
import { IShortUrlRepository } from '../../repositories/short-url.repository.interface';

@Injectable()
export class ShortUrlRepository implements IShortUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createShortUrl(data: CreateShortUrlDto): Promise<ShortUrlModel> {
    const uniqueShortUrl = await this.generateUniqueShortUrl();

    return this.prisma.shortUrls.create({
      data: {
        originalUrl: data.originalUrl,
        shortUrl: uniqueShortUrl,
        userId: data.userId,
        clickCount: 0,
      },
    });
  }

  private async generateUniqueShortUrl(): Promise<string> {
    let unique = false;
    let shortUrl = '';

    while (!unique) {
      shortUrl = this.createRandomString();
      unique = await this.isUniqueShortUrl(shortUrl);
    }

    return shortUrl;
  }

  private createRandomString(length = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }

  private async isUniqueShortUrl(shortUrl: string): Promise<boolean> {
    const existingUrl = await this.prisma.shortUrls.findUnique({
      where: { shortUrl },
    });
    return !existingUrl;
  }

  async findShortUrlByCode(shortUrl: string): Promise<ShortUrlModel | null> {
    return this.prisma.shortUrls.findUnique({
      where: { shortUrl },
    });
  }

  async findShortUrlsByUserId(userId: string): Promise<ShortUrlModel[]> {
    return this.prisma.shortUrls.findMany({
      where: { userId },
    });
  }

  async updateShortUrl(
    id: string,
    data: CreateShortUrlDto,
  ): Promise<ShortUrlModel> {
    return this.prisma.shortUrls.update({
      where: { id },
      data,
    });
  }

  async deleteShortUrl(id: string): Promise<void> {
    await this.prisma.shortUrls.delete({
      where: { id },
    });
  }
}
