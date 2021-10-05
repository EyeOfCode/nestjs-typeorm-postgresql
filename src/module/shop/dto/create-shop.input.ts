import {
  ShopCreateSchema,
  IShopCreate,
} from './../../../common-types/shop/index';
import { UseSchema } from 'nestjs-yup';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
@UseSchema(ShopCreateSchema)
export class CreateShopInput implements IShopCreate {
  @Field()
  name!: string;

  @Field()
  address!: string;

  @Field({ defaultValue: false })
  isOpen: boolean;

  @Field()
  description: string;
}
