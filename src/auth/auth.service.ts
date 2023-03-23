import { UserInputError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import jwtConfig from '../common/config/jwt.config';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { RedisService } from '../redis/redis.service';
import { User } from '../users/entities/user.entity';
import { BcryptService } from './bcrypt.service';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const { email, password } = signUpInput;

    try {
      const user = new User();
      user.email = email;
      user.password = await this.bcryptService.hash(password);
      await this.userRepository.save(user);

      return this.generateAuthToken(user);
    } catch (error) {
      if (error.code === MysqlErrorCode.UniqueViolation) {
        throw new ApolloError(`User [${email}] already exist`, 'CONFLICT');
      }
      throw error;
    }
  }

  async signIn(signInInput: SignInInput) {
    const { email, password } = signInInput;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
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

    return this.generateAuthToken(user);
  }

  async signOut(userId: string) {
    this.redisService.delete(`user-${userId}`);
  }

  async generateAuthToken(user: Partial<User>) {
    const tokenId = randomUUID();

    await this.redisService.insert(`user-${user.id}`, tokenId);

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { ...user, accessToken };
  }
}
