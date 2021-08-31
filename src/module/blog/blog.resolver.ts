import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { I18nService, I18nLang } from 'nestjs-i18n';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    private readonly blogService: BlogService,
    private readonly i18n: I18nService,
  ) {}

  @Query(() => String)
  async getBlog(): Promise<string> {
    return this.blogService.get();
  }
}
