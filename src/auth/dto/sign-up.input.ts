import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { InputType } from '@nestjs/graphql';

import { Match } from '../../common/decorators/match.decorator';

@InputType()
export class SignUpInput {
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;

  @Match('password')
  @IsNotEmpty()
  readonly passwordConfirm: string;
}
