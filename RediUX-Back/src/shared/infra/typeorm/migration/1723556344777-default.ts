import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1723556344777 implements MigrationInterface {
  name = "Default1723556344777";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_tags" DROP CONSTRAINT "FK_2346c63b132eacb6cf5a8ccaacd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" DROP CONSTRAINT "PK_704201a473cfe0e2f646bea32b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD CONSTRAINT "PK_b957bee53dd842e59e479e9afde" PRIMARY KEY ("content_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2346c63b132eacb6cf5a8ccaac"`,
    );
    await queryRunner.query(`ALTER TABLE "content_tags" DROP COLUMN "tag_id"`);
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD "tag_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" DROP CONSTRAINT "PK_b957bee53dd842e59e479e9afde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD CONSTRAINT "PK_704201a473cfe0e2f646bea32b3" PRIMARY KEY ("content_id", "tag_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2346c63b132eacb6cf5a8ccaac" ON "content_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD CONSTRAINT "FK_2346c63b132eacb6cf5a8ccaacd" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_tags" DROP CONSTRAINT "FK_2346c63b132eacb6cf5a8ccaacd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2346c63b132eacb6cf5a8ccaac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" DROP CONSTRAINT "PK_704201a473cfe0e2f646bea32b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD CONSTRAINT "PK_b957bee53dd842e59e479e9afde" PRIMARY KEY ("content_id")`,
    );
    await queryRunner.query(`ALTER TABLE "content_tags" DROP COLUMN "tag_id"`);
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD "tag_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2346c63b132eacb6cf5a8ccaac" ON "content_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" DROP CONSTRAINT "PK_b957bee53dd842e59e479e9afde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD CONSTRAINT "PK_704201a473cfe0e2f646bea32b3" PRIMARY KEY ("tag_id", "content_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_tags" ADD CONSTRAINT "FK_2346c63b132eacb6cf5a8ccaacd" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
