import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../module/user/entities/user.entity';
import { Hash } from '../../helper/auth';
import { Role } from 'src/common-types/enum/role';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const hashPassword = await Hash.hashPassword('123123');
    const user = await connection.getRepository(User).create({
      email: 'test.email.com',
      password: hashPassword,
      firstName: 'test',
      lastName: 'test',
      isActive: true,
      roles: [Role.ADMIN],
    });
    await connection.getRepository(User).save(user);
  }
}
