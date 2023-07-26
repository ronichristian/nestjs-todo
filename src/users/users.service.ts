import { Injectable, ConflictException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = this.dataSource.getRepository(User).findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  async registerUser(data: any): Promise<User> {
    const user = await this.dataSource.getRepository(User).findOne({
      where: {
        username: data.username,
      },
    });

    if (user) {
      throw new ConflictException();
    }

    const salt = bcrypt.genSaltSync(10);
    return await this.dataSource.getRepository(User).save({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: bcrypt.hashSync(data.password, salt),
      salt: salt,
    });
  }
}
