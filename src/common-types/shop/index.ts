import { StatusShop } from '../enum/status';
import * as yup from 'yup';

export const ShopSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  isOpen: yup.boolean().default(false),
  description: yup.string().notRequired(),
});

export type IShop = yup.InferType<typeof ShopSchema>;

export const ShopCreateSchema = ShopSchema;

export type IShopCreate = yup.InferType<typeof ShopCreateSchema>;

export const ShopUpdateSchema = yup
  .object({
    status: yup.lazy((value) =>
      value === null
        ? yup.string().nullable()
        : yup.mixed<StatusShop>().oneOf(Object.values(StatusShop)),
    ),
  })
  .concat(ShopSchema);

export type IShopUpdate = yup.InferType<typeof ShopUpdateSchema>;
