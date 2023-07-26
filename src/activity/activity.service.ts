import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Activity } from './activiy.entity'

@Injectable()
export class ActivityService {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async successLogin(data) {
        await this.dataSource.getRepository(Activity).save({
            owner_id: data.todo.user_id,
            editorId: data.todo.user_id,
            origin: 'web',
            details: 'Login',
        });
    }

    async addTodo(data) {
        await this.dataSource.getRepository(Activity).save({
            owner_id: data.todo.user_id,
            editorId: data.todo.user_id,
            origin: 'web',
            details: 'Create Todo',
        });
    }

    async deleteTodo(data) {
        await this.dataSource.getRepository(Activity).save({
            owner_id: data.todo.user_id,
            editorId: data.todo.user_id,
            origin: 'web',
            details: 'Delete Todo',
        });
    }

    async updateTodo(data) {
        await this.dataSource.getRepository(Activity).save({
            owner_id: data.todo.user_id,
            editorId: data.todo.user_id,
            origin: 'web',
            details: 'Update Todo',
        });
    }

    async getTodos(data) {
        await this.dataSource.getRepository(Activity).save({
            owner_id: "guest",
            editorId: "guest",
            origin: 'web',
            details: 'Retrieve Todo List',
        });
    }
}
