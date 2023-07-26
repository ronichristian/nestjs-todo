import { IsNotEmpty, IsString } from 'class-validator';
import { userInfo } from 'os';
import { Role } from '../../interface/user.interface';

export class AuthenticateDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
