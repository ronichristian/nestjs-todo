import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRoleColumnOnUsersTable1689841812723
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'role',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['role']);
  }
}
