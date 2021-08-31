import { StatusBlog } from '../../../common-types/enum/status';
import {
  BlogCreateSchema,
  IBlogCreate,
} from './../../../common-types/blog/index';
import { InputType, Field } from '@nestjs/graphql';
import { UseSchema } from 'nestjs-yup';

@InputType()
@UseSchema(BlogCreateSchema)
export class UpdateBlogInput implements IBlogCreate {
  @Field()
  status: StatusBlog;

  @Field()
  description: string;
}
