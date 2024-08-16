import { UserModel } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface IUserRepository {
  createUser(data: CreateUserDto): Promise<UserModel>;
  findUserById(id: string): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserModel>;
  deleteUser(id: string): Promise<void>;
}
