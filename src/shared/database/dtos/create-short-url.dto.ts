import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateShortUrlDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;
}
