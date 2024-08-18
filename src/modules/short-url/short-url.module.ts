import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ShortUrlController } from './controllers/short-url.controller';
import { CreateShortUrlService } from './services/create-short-url.service';
import { GetShortUrlByUserIdService } from './services/get-short-by-user.service';
import { DeleteShortUrlService } from './services/delete-short-url.service';
import { OptionalAuthMiddleware } from 'src/shared/middlewares/optional-auth.middleware';
import { ProvidersModule } from 'src/shared/providers/providers.module';
import { GetShortUrlByIdService } from './services/get-short-url-by-id.service';
import { GetOriginalUrlByShortService } from './services/get-original-url-by-short.service';
import { UpdateShortUrlService } from './services/update-short-url.service';

@Module({
  imports: [ProvidersModule],
  controllers: [ShortUrlController],
  providers: [
    CreateShortUrlService,
    DeleteShortUrlService,
    GetShortUrlByIdService,
    UpdateShortUrlService,
    GetShortUrlByUserIdService,
    GetOriginalUrlByShortService,
  ],
  exports: [
    CreateShortUrlService,
    GetShortUrlByIdService,
    GetShortUrlByUserIdService,
    GetOriginalUrlByShortService,
  ],
})
export class ShortUrlModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OptionalAuthMiddleware)
      .forRoutes({ path: 'v1/shortUrl', method: RequestMethod.POST });
  }
}
