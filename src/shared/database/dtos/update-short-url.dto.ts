import { IsString, IsOptional, IsUrl } from 'class-validator';
import { UserModel } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShortUrlDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsUrl()
  originalUrl?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  user?: UserModel;
}
