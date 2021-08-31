import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1630314755459 implements MigrationInterface {
  name = 'Migration1630314755459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "blog_status_enum" AS ENUM('pending', 'public', 'private')`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "blog_status_enum" NOT NULL DEFAULT 'pending', "description" text NOT NULL, "userId" uuid, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "roles" text`);
    await queryRunner.query(
      `CREATE TYPE "user_status_enum" AS ENUM('pending', 'active', 'ban')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "status" "user_status_enum" NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_fc46ede0f7ab797b7ffacb5c08d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_fc46ede0f7ab797b7ffacb5c08d"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "user_status_enum"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TYPE "blog_status_enum"`);
  }
}
