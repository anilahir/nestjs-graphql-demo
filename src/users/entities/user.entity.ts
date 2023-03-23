import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType({ description: 'User Model' })
export class User {
  @Field(() => ID, { description: 'Unique Identifier' })
  id: string;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;
}
