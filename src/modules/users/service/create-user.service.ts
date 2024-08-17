import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/shared/database/dtos/create-user.dto';
import { IUserRepository } from 'src/shared/database/repositories/user-repository.interface';
import { IHashProvider } from 'src/shared/providers/interfaces/hash.provider.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(data: CreateUserDto) {
    const { name, email, password } = data;

    await this.verifyUserExistsByEmail(email);

    const passwordHash = await this.hashPassword(password);

    const user = await this.createUser(name, email, passwordHash);

    return user;
  }

  private async verifyUserExistsByEmail(email: string) {
    const userAlreadyExists = await this.userRepository.findUserByEmail(email);
    if (userAlreadyExists) {
      throw new ConflictException({
        message: 'User e-mail already exists',
      });
    }
  }

  private async hashPassword(password: string) {
    return this.hashProvider.createHash(password);
  }

  private async createUser(name: string, email: string, passwordHash: string) {
    return this.userRepository.createUser({
      name,
      email,
      password: passwordHash,
    });
  }
}
