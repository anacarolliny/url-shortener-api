import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HashProvider } from './hash.provider';
import { JwtProvider } from './jwt.provider';
import { OptionalAuthMiddleware } from '../middlewares/optional-auth.middleware';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'JwtProvider',
      useClass: JwtProvider,
    },
    {
      provide: 'OptionalAuthMiddleware',
      useClass: OptionalAuthMiddleware,
    },
    JwtModule,
  ],

  exports: ['HashProvider', 'JwtProvider', 'OptionalAuthMiddleware', JwtModule],
})
export class ProvidersModule {}
