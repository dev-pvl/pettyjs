import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.findOneBy({ email });
  }

  async findOneByID(id: number): Promise<User> {
    return this.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    Logger.log('findAll repo');
    return this.find();
  }
}
