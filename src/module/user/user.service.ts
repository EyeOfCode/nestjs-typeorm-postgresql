import { UserCreateInput } from './../../dto/user/create-user-input.dto';
import { User } from '../../entity/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: UserCreateInput): Promise<User> {
    const payload = this.userRepository.create(data);
    return this.userRepository.save(payload);
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }
}