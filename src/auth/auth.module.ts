import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [AuthResolver, AuthService, BcryptService],
})
export class AuthModule {}
