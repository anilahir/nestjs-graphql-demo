import { ObjectType } from '@nestjs/graphql';

import { User } from '../../users/entities/user.entity';

@ObjectType({ description: 'Auth Token Model' })
export class AuthToken extends User {
  accessToken: string;
}
