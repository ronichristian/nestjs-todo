import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/typeorm.config';
import { ActivityModule } from './activity/activity.module';
import { EventModule } from './_utils/events/event.module';

@Module({
  imports: [
    EventModule,
    EventEmitterModule.forRoot(),
    ActivityModule,
    TodoModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
