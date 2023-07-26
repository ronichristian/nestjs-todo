import { Module } from '@nestjs/common';
import { EventService } from './event.service';

@Module({
    imports: [],
    controllers: [],
    providers: [EventService],
    exports: [],
})
export class EventModule { }
