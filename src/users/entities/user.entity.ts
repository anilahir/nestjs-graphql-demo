import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
@ObjectType({ description: 'User Model' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique Identifier' })
  id: string;

  @Column({ unique: true })
  email: string;

  @HideField()
  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
