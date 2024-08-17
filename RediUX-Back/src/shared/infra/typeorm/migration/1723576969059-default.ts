import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1723576969059 implements MigrationInterface {
  name = "Default1723576969059";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_admin" DROP CONSTRAINT "PK_4f0f50d9922a0ed51c214f5556b"`,
    );
    await queryRunner.query(`ALTER TABLE "users_admin" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "users_admin" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_admin" ADD CONSTRAINT "PK_4f0f50d9922a0ed51c214f5556b" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_admin" DROP CONSTRAINT "PK_4f0f50d9922a0ed51c214f5556b"`,
    );
    await queryRunner.query(`ALTER TABLE "users_admin" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "users_admin" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_admin" ADD CONSTRAINT "PK_4f0f50d9922a0ed51c214f5556b" PRIMARY KEY ("id")`,
    );
  }
}
