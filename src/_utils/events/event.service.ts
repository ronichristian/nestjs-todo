import { Injectable } from '@nestjs/common';
import { OnEvent } from "@nestjs/event-emitter";
import { ActivityService } from 'src/activity/activity.service';
import { EventName } from 'src/enums/event-names.enums';

@Injectable()
export class EventService {
    constructor(
        private readonly activityService: ActivityService,
    ) {
        //
    }

    @OnEvent(EventName.SuccessLogin, { async: true })
    async handleSuccessLoginApiEvents(payload: any) {
        await this.activityService.successLogin(payload);
    }

    @OnEvent(EventName.AddTodo, { async: true })
    async handleCreateTodoApiEvents(payload: any) {
        await this.activityService.addTodo(payload);
    }

    @OnEvent(EventName.DeleteTodo, { async: true })
    async handleDeleteTodoApiEvents(payload: any) {
        await this.activityService.deleteTodo(payload);
    }

    @OnEvent(EventName.UpdateTodo, { async: true })
    async handleUpdateTodoApiEvents(payload: any) {
        await this.activityService.updateTodo(payload);
    }

    @OnEvent(EventName.GetTodos, { async: true })
    async handleGetTodoApiEvents(payload: any) {
        await this.activityService.getTodos(payload);
    }
}
