import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/entity/user/user.entity';
import { Hash } from '../../helper/auth';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const hashPassword = await Hash.hashPassword('123123');
    const user = await connection.getRepository(User).create({
      email: 'test.email.com',
      password: hashPassword,
      firstName: 'test',
      lastName: 'test',
      isActive: true,
    });
    await connection.getRepository(User).save(user);
  }
}
