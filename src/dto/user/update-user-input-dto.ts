import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateSchema, IUserUpdate } from '../../common-types';
import { UseSchema } from 'nestjs-yup';

@InputType()
@UseSchema(UserUpdateSchema)
export class UserUpdateInput implements IUserUpdate {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  isActive: boolean;
}
