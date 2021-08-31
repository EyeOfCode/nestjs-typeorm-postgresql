import { StatusBlog } from '../enum/status';
import * as yup from 'yup';

export const BlogSchema = yup.object({
  status: yup.lazy((value) =>
    value === null
      ? yup.string().nullable()
      : yup.mixed<StatusBlog>().oneOf(Object.values(StatusBlog)),
  ),
  description: yup.string().notRequired(),
});

export type IBlog = yup.InferType<typeof BlogSchema>;

export const BlogCreateSchema = BlogSchema;

export type IBlogCreate = yup.InferType<typeof BlogCreateSchema>;

export const BlogUpdateSchema = yup.object().concat(BlogSchema);

export type IBlogUpdate = yup.InferType<typeof BlogUpdateSchema>;
