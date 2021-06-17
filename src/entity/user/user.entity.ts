import { BaseEntity } from '../base.entity';
import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserSchema, IUser } from '../../common-types';
import { UseSchema } from 'nestjs-yup';

@Entity()
@ObjectType()
@UseSchema(UserSchema)
export class User extends BaseEntity implements IUser {
  @Column('text', { nullable: true, unique: true })
  @Field()
  email!: string;

  @Column('text')
  @Field()
  password!: string;

  @Column('text')
  @Field()
  firstName!: string;

  @Column('text')
  @Field()
  lastName!: string;

  @Column({ default: false })
  @Field({ defaultValue: false })
  isActive: boolean;
}
