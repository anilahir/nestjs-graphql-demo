import { Injectable } from '@nestjs/common';

import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  signUp(signUpInput: SignUpInput) {
    return 'This action sign up the user and return the jwt token';
  }

  signIn(signInInput: SignInInput) {
    return 'This action sign in the user and return the jwt token';
  }
}
