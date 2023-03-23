import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { BcryptService } from './bcrypt.service';
import jwtConfig from '../common/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthResolver, AuthService, BcryptService],
  exports: [JwtModule],
})
export class AuthModule {}
