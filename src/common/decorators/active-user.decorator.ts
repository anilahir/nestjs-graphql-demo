import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { REQUEST_USER_KEY } from '../constants';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const { req } = GqlExecutionContext.create(ctx).getContext();
    const user: ActiveUserData | undefined = req[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
