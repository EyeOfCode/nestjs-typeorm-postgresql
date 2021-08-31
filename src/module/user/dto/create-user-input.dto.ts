import { InputType, Field } from '@nestjs/graphql';
import { UserCreateSchema, IUserCreate } from '../../../common-types';
import { UseSchema } from 'nestjs-yup';
import { StatusUser } from 'src/common-types/enum/status';

// import { Matches } from 'class-validator';
// import { MatchValidate } from '../../validator/decorator/match.decorator';

@InputType()
@UseSchema(UserCreateSchema)
export class UserCreateInput implements IUserCreate {
  @Field()
  email!: string;

  @Field()
  // not use validate yup
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password!: string;

  @Field()
  // use custom validate and not use validate yup
  // @MatchValidate('password')
  confirm_password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ defaultValue: false })
  isActive: boolean;

  @Field()
  status: StatusUser;
}
