import { Hash } from './../../helper/auth';
import { UserCreateInput } from './dto/create-user-input.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateInput } from './dto/update-user-input-dto';
import { StatusUser } from '../../common-types/enum/status';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getList(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    return null;
  }

  async create(data: UserCreateInput): Promise<User> {
    const hashPassword = await Hash.hashPassword(data.password);
    const payload = this.userRepository.create({
      ...data,
      status: StatusUser.PENDING,
      password: hashPassword,
    });
    return this.userRepository.save(payload);
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async update(id: string, data: UserUpdateInput): Promise<boolean> {
    try {
      const payload = this.userRepository.create(data);
      await this.userRepository.update({ id }, payload);
    } catch (e) {
      return false;
    }
    return true;
  }
}
