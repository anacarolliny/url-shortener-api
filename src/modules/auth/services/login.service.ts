import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/shared/database/repositories/user-repository.interface';
import { IJwtProvider } from 'src/shared/providers/interfaces/jwt.provider.interface';
import { LoginDto } from '../dtos/login-dto';
import { AuthResponseDTO } from '../dtos/auth-response.dto';
import { ValidateUserService } from './validate-user.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject('UserRepository')
    private readonly usersRepository: IUserRepository,
    @Inject('JwtProvider')
    private readonly jwtProvider: IJwtProvider,
    private readonly validateUserService: ValidateUserService,
  ) {}

  async execute({ email, password }: LoginDto): Promise<AuthResponseDTO> {
    const validUser = await this.validateUserService.execute(email, password);

    if (!validUser) {
      throw new UnauthorizedException({
        message: 'Invalid username or password',
      });
    }

    const payload = {
      id: validUser.id,
      email: validUser.email,
      sub: validUser.id,
    };
    const token = await this.jwtProvider.encryptToken(payload);
    const expirationDate = await this.jwtProvider.getExpirationDate(token);
    return {
      user: {
        id: validUser.id,
        name: validUser.name,
        email: validUser.email,
      },
      accessToken: token,
      expires: expirationDate.toISOString(),
    };
  }
}
