import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserIdToTodosTable1689830437766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('todo', [
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('todo', ['user_id']);
  }
}
