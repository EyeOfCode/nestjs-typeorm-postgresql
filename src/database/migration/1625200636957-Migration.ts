import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1625200636957 implements MigrationInterface {
  name = 'Migration1625200636957';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
  }
}
