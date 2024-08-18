import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './shared/providers/providers.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ShortUrlModule } from './modules/short-url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProvidersModule,
    AuthModule,
    UsersModule,
    ShortUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
