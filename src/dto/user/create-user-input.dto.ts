import { InputType, Field } from '@nestjs/graphql';
import { UserCreateSchema, IUserCreate } from '../../common-types';
import { UseSchema } from 'nestjs-yup';

@InputType()
@UseSchema(UserCreateSchema)
export class UserCreateInput implements IUserCreate {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirm_password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ defaultValue: false })
  isActive: boolean;
}
