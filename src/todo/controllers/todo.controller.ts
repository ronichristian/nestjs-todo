/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoDTO } from '../dto/todo.dto';
import { TodoService } from '../services/todo.service';
import { SetMetadata } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Todo } from '../entity';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('todos') // here todos referring to localhost/todos
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Public()
  @Get()
  async getTodos(): Promise<any> {
    const todos = await this.todoService.getTodos();
    return todos;
  }

  @Post()
  @Roles(Role.Admin)
  async createTodo(
    @Body() createTodo: TodoDTO,
    @CurrentUser() user,
  ): Promise<Todo> {
    const newTodo: TodoDTO = {
      ...createTodo,
    };
    return await this.todoService.create(newTodo, user.id);
  }

  @Public()
  @Roles(Role.Admin)
  @Get(':id')
  async getTodo(
    @Param('id') id,
    @CurrentUser() user,
  ): Promise<any> {
    return await this.todoService.getTodo(id, user.id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async updateTodo(
    @Body() updateTodo: TodoDTO, 
    @Param('id') id,
    @CurrentUser() user,
  ): Promise<any> {
    const { title, status } = updateTodo;
    return await this.todoService.updateTodo(id, title, status, user.id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteTodo(
    @Param('id') id,
    @CurrentUser() user,
  ): Promise<any> {
    return await this.todoService.deleteTodo(id, user.id);
  }
}
