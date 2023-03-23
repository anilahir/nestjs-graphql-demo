import { Query, Resolver } from '@nestjs/graphql';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'getMe' })
  async getMe(@ActiveUser('id') userId: string) {
    return this.usersService.getMe(userId);
  }
}
