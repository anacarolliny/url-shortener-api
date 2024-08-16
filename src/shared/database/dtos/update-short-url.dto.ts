import { IsString, IsOptional, IsUrl } from 'class-validator';
import { UserModel } from '../models/user.model';

export class UpdateShortUrlDto {
  @IsString()
  @IsOptional()
  @IsUrl()
  originalUrl?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  user?: UserModel;
}
