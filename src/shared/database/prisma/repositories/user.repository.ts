import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserModel } from '../../models/user.model';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { UpdateUserDto } from '../../dtos/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  async findUserById(id: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id },

      include: {
        shortUrls: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserModel> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
