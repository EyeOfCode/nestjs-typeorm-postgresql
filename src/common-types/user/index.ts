import * as yup from 'yup';

export const UserSchema = yup.object({
  email: yup.string().email().required('invalid email'),
  password: yup.string().required('invalid password'),
  firstName: yup.string().required('invalid first name'),
  lastName: yup.string().required('invalid last name'),
  isActive: yup.bool().default(false),
});

export type IUser = yup.InferType<typeof UserSchema>;

export const UserCreateSchema = yup
  .object({
    confirm_password: yup.mixed().when('password', {
      is: (value) => value,
      then: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    }),
  })
  .concat(UserSchema);

export type IUserCreate = yup.InferType<typeof UserCreateSchema>;

export const UserUpdateSchema = yup.object({
  firstName: yup.string().required('invalid first name'),
  lastName: yup.string().required('invalid last name'),
  isActive: yup.bool().default(false),
});

export type IUserUpdate = yup.InferType<typeof UserUpdateSchema>;
