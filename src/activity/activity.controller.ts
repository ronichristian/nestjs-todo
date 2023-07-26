import { Controller, Post, Body } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
    constructor(private activityService: ActivityService) { }

    @Post()
    logActivity(@Body() log, @CurrentUser() user: Record<string, any>) {
        return 'asd';
    }
}
