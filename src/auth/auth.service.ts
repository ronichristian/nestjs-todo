import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const isValidated = this.validateUser(username, pass);
    const user = await this.usersService.findOne(username);

    if (!isValidated) {
      throw new NotFoundException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await user.validatePassword(pass))) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
      role: user.role,
    };
  }

  async getProfile(id) {
    const user = await this.dataSource.getRepository(User).findOne({
      relations: ['userTodos'],
      where: {
        id: id,
      },
    });
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
