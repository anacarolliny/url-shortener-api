import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { CreateUserService } from './service/create-user.service';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService],
})
export class UsersModule {}
