import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String, { name: 'signUp' })
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => String, { name: 'signIn' })
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
