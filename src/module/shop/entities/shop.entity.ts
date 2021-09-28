import { ShopSchema, IShop } from './../../../common-types/shop/index';
import { User } from './../../user/entities/user.entity';
import { StatusShop } from './../../../common-types/enum/status';
import { BaseEntity } from '../../../entity/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UseSchema } from 'nestjs-yup';

@Entity()
@ObjectType()
@UseSchema(ShopSchema)
export class Shop extends BaseEntity implements IShop {
  @Column('text')
  @Field()
  name!: string;

  @Column('text')
  @Field()
  address!: string;

  @Column({ default: false })
  @Field({ defaultValue: false })
  isOpen: boolean;

  @Column('text', { nullable: true })
  @Field()
  description: string;

  @Column({ type: 'enum', enum: StatusShop, default: StatusShop.PENDING })
  @Field()
  status: StatusShop;

  @OneToOne(() => Shop, (shop: Shop) => shop.user)
  @JoinColumn()
  user: User;
}
