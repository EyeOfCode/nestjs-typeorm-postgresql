import { User } from 'src/entity/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Hash } from '../../helper/auth';

export class Migration1625156650554 implements MigrationInterface {
  name = 'Migration1625156650554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" text NOT NULL, "password" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    const hashPassword = await Hash.hashPassword('123123');
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        email: 'test_migretion@test.co ',
        password: hashPassword,
        firstName: 'test',
        lastName: 'test',
        isActive: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}