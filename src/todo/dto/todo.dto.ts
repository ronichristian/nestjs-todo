import { IsString, MinLength, MaxLength } from 'class-validator';

export class TodoDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  id?: string;
  title: string;
  status: 'todo' | 'done' | 'in progress';
}
