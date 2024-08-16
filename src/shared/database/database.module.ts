import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './prisma/repositories/user.repository';
import { ShortUrlRepository } from './prisma/repositories/short-url.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ShortUrlRepository',
      useClass: ShortUrlRepository,
    },
  ],
  exports: ['UserRepository', 'ShortUrlRepository'],
})
export class DatabaseModule {}
