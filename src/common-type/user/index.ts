import * as yup from 'yup';

export const UserSchema = yup.object({
  email: yup.string().required('invalida email'),
});

export type IUser = yup.InferType<typeof UserSchema>;

export const UserCreateSchema = yup.object({});

export type IUserCreate = yup.InferType<typeof UserCreateSchema>;

export const UserUpdateSchema = yup.object({});

export type IUserUpdate = yup.InferType<typeof UserSchema>;
