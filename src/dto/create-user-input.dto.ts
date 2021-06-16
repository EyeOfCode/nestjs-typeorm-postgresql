import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName?: string;

  @Field()
  isActive: boolean;
}
