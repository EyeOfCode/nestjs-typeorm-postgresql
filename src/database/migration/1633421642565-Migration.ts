import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1633421642565 implements MigrationInterface {
    name = 'Migration1633421642565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" text NOT NULL, "password" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "description" text, "roles" text DEFAULT 'user', "status" "user_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "address" text NOT NULL, "isOpen" boolean NOT NULL DEFAULT false, "description" text, "status" "shop_status_enum" NOT NULL DEFAULT 'pending', "userId" uuid, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6"`);
        await queryRunner.query(`DROP TABLE "shop"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
