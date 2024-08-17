import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserService } from '../service/create-user.service';
import { CreateUserDto } from 'src/shared/database/dtos/create-user.dto';
import { Public } from 'src/shared/decorators/is-public-endpoint.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user', operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }
}
