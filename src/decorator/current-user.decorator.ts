import { CurrUser } from '../interface/current-user.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<CurrUser> => {
    const request = await ctx.switchToHttp().getRequest();
    return request.user;
  },
);
