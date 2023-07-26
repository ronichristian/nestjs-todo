import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { Todo } from './entity/todo.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guard/auth.guard';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/role/roles.guard';
import { ActivityService } from 'src/activity/activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, ActivityService]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [TodoController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    TodoService,
  ],
  exports: [TodoService, TypeOrmModule],
})
export class TodoModule {}
