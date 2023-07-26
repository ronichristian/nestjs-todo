import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTodoTable1689734764413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUuidExtenstion(queryRunner);

    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'status',
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
    await queryRunner.query(`DROP TABLE if exists todo cascade`);
  }

  async createUuidExtenstion(queryRunner: QueryRunner) {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }
}
