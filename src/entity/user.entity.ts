import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';
import { Field } from '@nestjs/graphql';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true, unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  firstName: string;

  @Column({ nullable: true })
  @Field()
  lastName?: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;
}
