import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async get(): Promise<string> {
    return 'This action adds a new blog';
  }

  async create(data: CreateBlogInput): Promise<Blog> {
    const payload = this.blogRepository.create(data);
    return this.blogRepository.save(payload);
  }
}
