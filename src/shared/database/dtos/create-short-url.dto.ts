import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateShortUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;
}
