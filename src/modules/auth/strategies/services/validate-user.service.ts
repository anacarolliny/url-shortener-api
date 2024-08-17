import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/shared/database/repositories/user-repository.interface';
import { IHashProvider } from 'src/shared/providers/interfaces/hash.provider.interface';

@Injectable()
export class ValidateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly usersRepository: IUserRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (user.deletedAt) {
      throw new UnauthorizedException({
        message: 'User is deleted',
      });
    }

    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid username or password',
      });
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (passwordMatch) {
      return user;
    }

    return null;
  }
}
