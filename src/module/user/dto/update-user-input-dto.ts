import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateSchema, IUserUpdate } from '../../../common-types';
import { UseSchema } from 'nestjs-yup';
import { StatusUser } from 'src/common-types/enum/status';

@InputType()
@UseSchema(UserUpdateSchema)
export class UserUpdateInput implements IUserUpdate {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  isActive: boolean;

  @Field()
  status: StatusUser;
}
