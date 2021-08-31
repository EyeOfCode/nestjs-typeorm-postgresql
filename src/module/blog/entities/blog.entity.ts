import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../entity/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { StatusBlog } from '../../../common-types/enum/status';
import { BlogSchema, IBlog } from '../../../common-types';
import { UseSchema } from 'nestjs-yup';

registerEnumType(StatusBlog, { name: 'status' });

@Entity()
@ObjectType()
@UseSchema(BlogSchema)
export class Blog extends BaseEntity implements IBlog {
  @Column({ type: 'enum', enum: StatusBlog, default: StatusBlog.PENDING })
  @Field()
  status: StatusBlog;

  @Column('text')
  @Field()
  description: string;

  @ManyToOne(() => User, (user: User) => user.blog)
  @JoinColumn()
  user!: User;
}
