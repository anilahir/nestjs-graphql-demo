import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

import { User } from '../users/entities/user.entity';
import { BcryptService } from './bcrypt.service';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const { email, password } = signUpInput;

    const hashedPassword = await this.bcryptService.hash(password);

    const user = {
      id: randomUUID(),
      email,
      password: hashedPassword,
    };

    this.users.push(user);

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        expiresIn: 3600,
        secret: 'super-secret',
      },
    );

    return { ...user, accessToken };
  }

  async signIn(signInInput: SignInInput) {
    const { email, password } = signInInput;

    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new UserInputError('Invalid email');
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UserInputError('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        expiresIn: 3600,
        secret: 'super-secret',
      },
    );

    return { ...user, accessToken };
  }
}
