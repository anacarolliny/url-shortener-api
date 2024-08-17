import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';

import { ValidateUserService } from './services/validate-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginService } from './services/login.service';

@Module({
  controllers: [AuthController],
  providers: [LoginService, ValidateUserService, JwtStrategy],
  exports: [LoginService, ValidateUserService],
})
export class AuthModule {}
