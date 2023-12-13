import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { email, password, ...rest } = createUserDto;

    // Check if the user with the given email already exists
    const existingUser = await this.usersRepository.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.save({
      email,
      password: hashedPassword,
      ...rest,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
