import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Injectable()
export class BlogService {
  async get(): Promise<string> {
    return 'This action adds a new blog';
  }
}
