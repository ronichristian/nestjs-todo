import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { Activity } from './activiy.entity';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Activity])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [TypeOrmModule, ActivityService],
})
export class ActivityModule { }
