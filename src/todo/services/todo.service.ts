import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async create(data: any, id: string) {
    return await this.dataSource.getRepository(Todo).save({
      title: data.title,
      status: data.status,
      user_id: id,
    });
  }

  async getTodos() {
    return await this.dataSource.getRepository(Todo).find({});
  }

  async getTodo(id) {
    const todo = await this.dataSource.getRepository(Todo).findBy({ id });
    return todo;
  }

  async updateTodo(todoId, title, status) {
    return await this.dataSource.getRepository(Todo).update(todoId, {
      title,
      status,
    });
  }

  async deleteTodo(todoId) {
    return await this.dataSource.getRepository(Todo).delete({
      id: todoId,
    });
  }
}
