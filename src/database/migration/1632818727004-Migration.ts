import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1632818727004 implements MigrationInterface {
    name = 'Migration1632818727004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_status_enum" AS ENUM('pending', 'active', 'ban')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" text NOT NULL, "password" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "description" text, "roles" text, "status" "user_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_status_enum"`);
    }

}
