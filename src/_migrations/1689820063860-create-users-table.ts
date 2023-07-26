import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1689820063860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUuidExtenstion(queryRunner);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE if exists users cascade`);
  }

  async createUuidExtenstion(queryRunner: QueryRunner) {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }
}
