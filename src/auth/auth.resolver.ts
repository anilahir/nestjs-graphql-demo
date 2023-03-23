import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { User } from '../users/entities/user.entity';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { AuthToken } from './entities/auth-token.entity';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthToken, { name: 'signUp' })
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => AuthToken, { name: 'signIn' })
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => User, { name: 'signOut', nullable: true })
  signOut(@ActiveUser('id') userId: string) {
    return this.authService.signOut(userId);
  }
}
