import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateShortUrlDto } from 'src/shared/database/dtos/create-short-url.dto';
import { CreateShortUrlService } from '../services/create-short-url.service';
import { GetLoggedUser } from 'src/shared/decorators/get-logged-user.decorator';
import { UserModel } from 'src/shared/database/models/user.model';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { GetShortUrlByUserIdService } from '../services/get-short-by-user.service';
import { DeleteShortUrlService } from '../services/delete-short-url.service';
import { UrlShortenerInterceptor } from 'src/shared/interceptors/short-url.interceptor';

import { GetShortUrlByIdService } from '../services/get-short-url-by-id.service';
import { GetOriginalUrlByShortService } from '../services/get-original-url-by-short.service';
import { UpdateShortUrlService } from '../services/update-short-url.service';
import { UpdateShortUrlDto } from 'src/shared/database/dtos/update-short-url.dto';

@ApiBearerAuth()
@ApiTags('Short Url')
@Controller({ path: 'shortUrl', version: '1' })
export class ShortUrlController {
  constructor(
    private readonly createShortUrlService: CreateShortUrlService,
    private readonly deleteShortUrlService: DeleteShortUrlService,
    private readonly updateShortUrlService: UpdateShortUrlService,
    private readonly getShortUrlByUserIdService: GetShortUrlByUserIdService,
    private readonly getShortUrlByIdService: GetShortUrlByIdService,
    private readonly getOriginalUrlByShortService: GetOriginalUrlByShortService,
  ) {}

  @ApiOperation({
    summary: 'Create a short url',
    operationId: 'createShortUrl',
  })
  @ApiBody({
    type: CreateShortUrlDto,
  })
  @Post()
  @UseInterceptors(UrlShortenerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  async createShortUrl(@Body() dto: CreateShortUrlDto) {
    return this.createShortUrlService.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete a shortned url',
    operationId: 'deleteShortnedUrl',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/delete')
  async deleteShortUrl(
    @Param('id') id: string,
    @GetLoggedUser() user: UserModel,
  ) {
    return this.deleteShortUrlService.execute(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update the original URL' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateShortUrlDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/update')
  async updateShortUrl(
    @Param('id') id: string,
    @Body() data: UpdateShortUrlDto,
    @GetLoggedUser() user: UserModel,
  ) {
    return this.updateShortUrlService.execute(id, data.originalUrl, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all short urls by user',
  })
  @Get('user/all')
  async getAllByUserId(@GetLoggedUser() user: UserModel) {
    return this.getShortUrlByUserIdService.execute(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get a shortned url by id ',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async getShortnedUrlById(@Param('id') id: string) {
    const shortUrl = await this.getShortUrlByIdService.execute(id);
    return shortUrl;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiParam({ name: 'shortUrl', description: 'The shortened URL identifier' })
  @Get('/redirect/:shortUrl')
  async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string) {
    const originalUrl =
      await this.getOriginalUrlByShortService.execute(shortUrl);
    return originalUrl;
  }
}
