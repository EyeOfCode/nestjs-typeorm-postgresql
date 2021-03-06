import { Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';
import { User } from '../../module/user/entities/user.entity';

export default class ClearDataSeeder implements Seeder {
  public async run(): Promise<void> {
    await getRepository(User).query('TRUNCATE "public"."user" CASCADE');
  }
}
