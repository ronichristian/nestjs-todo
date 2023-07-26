import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSaltColumnOnUsersTable1689832704148
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'salt',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['salt']);
  }
}
