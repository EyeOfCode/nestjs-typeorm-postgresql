import { Roles } from './../../middleware/decorator/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { JwtGuard } from 'src/middleware/guard/jwt.guard';
import { RolesGuard } from 'src/middleware/guard/roles.guard';
import { Role } from 'src/common-types/enum/role';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => String)
  async getBlog(): Promise<string> {
    return this.blogService.get();
  }

  @UseGuards(new JwtGuard(), RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Blog)
  async createBlog(@Args('data') data: CreateBlogInput): Promise<Blog> {
    return this.blogService.create(data);
  }
}
