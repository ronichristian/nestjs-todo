import { Controller, Body, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './register-user.dto';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUser: RegisterUserDto,
  ): Promise<RegisterUserDto> {
    const newUser: RegisterUserDto = {
      ...createUser,
    };
    const user = await this.usersService.registerUser(newUser);
    return user;
  }
}
