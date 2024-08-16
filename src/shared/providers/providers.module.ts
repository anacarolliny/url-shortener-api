import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HashProvider } from './hash.provider';
import { JwtProvider } from './jwt.provider';

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
  ],
  exports: ['HashProvider', 'JwtProvider'],
})
export class ProvidersModule {}
