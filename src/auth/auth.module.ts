import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [JwtModule],
  providers: [AuthResolver, AuthService, BcryptService],
})
export class AuthModule {}
