import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @CreateDateColumn({ nullable: false, name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, name: 'updated_at' })
  @Field()
  updatedAt: Date;
}
