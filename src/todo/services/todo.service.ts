import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventName } from '../../enums/event-names.enums'

@Injectable()
export class TodoService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(data: any, id: string) {
    // Event
    this.eventEmitter.emit(EventName.AddTodo, {
      todo: {
        user_id: id,
      },
    });
    return await this.dataSource.getRepository(Todo).save({
      title: data.title,
      status: data.status,
      user_id: id,
    });
  }

  async getTodos() {
    // Event
    this.eventEmitter.emit(EventName.GetTodos, {
      todo: {},
    });
    return await this.dataSource.getRepository(Todo).find({});
  }

  async getTodo(id, user_id) {
    // Event
    this.eventEmitter.emit(EventName.GetTodo, {
      todo: {
        user_id: user_id,
      },
    });
    const todo = await this.dataSource.getRepository(Todo).findBy({ id });
    return todo;
  }

  async updateTodo(todoId, title, status, user_id) {
    // Event
    this.eventEmitter.emit(EventName.UpdateTodo, {
      todo: {
        user_id: user_id,
      },
    });
    return await this.dataSource.getRepository(Todo).update(todoId, {
      title,
      status,
    });
  }

  async deleteTodo(todoId, user_id) {
    // Event
    this.eventEmitter.emit(EventName.DeleteTodo, {
      todo: {
        user_id: user_id,
      },
    });
    return await this.dataSource.getRepository(Todo).delete({
      id: todoId,
    });
  }
}
