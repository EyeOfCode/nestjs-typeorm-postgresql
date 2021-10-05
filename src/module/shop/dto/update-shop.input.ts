import { StatusShop } from './../../../common-types/enum/status';
import {
  ShopUpdateSchema,
  IShopUpdate,
} from './../../../common-types/shop/index';
import { UseSchema } from 'nestjs-yup';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
@UseSchema(ShopUpdateSchema)
export class UpdateShopInput implements IShopUpdate {
  @Field()
  name!: string;

  @Field()
  address!: string;

  @Field({ defaultValue: false })
  isOpen: boolean;

  @Field()
  description: string;

  @Field()
  status: StatusShop;
}
