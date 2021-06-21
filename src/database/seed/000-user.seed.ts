import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/entity/user/user.entity';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await connection.getRepository(User).create({
      email: 'test.email.com',
      password: '123123',
      firstName: 'test',
      lastName: 'test',
      isActive: true,
    });
    await connection.getRepository(User).save(user);
  }
}
