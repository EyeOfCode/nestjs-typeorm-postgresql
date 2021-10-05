import { StatusUser } from './../../../common-types/enum/status';
import { BaseEntity } from '../../../entity/base.entity';
import { Entity, Column, JoinColumn, Index, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserSchema, IUser } from '../../../common-types';
import { UseSchema } from 'nestjs-yup';
import { Role } from '../../../common-types/enum/role';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
@ObjectType()
@UseSchema(UserSchema)
export class User extends BaseEntity implements IUser {
  @Column('text', { unique: true })
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

  @Column('text', { nullable: true })
  @Field()
  description: string;

  @Column('simple-array', { nullable: true, default: 'user' })
  roles: Role[];

  @Column({ type: 'enum', enum: StatusUser, default: StatusUser.PENDING })
  @Field()
  status: StatusUser;

  @OneToMany(() => Shop, (shop: Shop) => shop.user)
  @JoinColumn()
  shop: [Shop];
}
