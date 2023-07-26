import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateActivityLogsTable1690339433587 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.createUuidExtenstion(queryRunner);

        await queryRunner.createTable(
            new Table({
                name: 'activity',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'owner_id',
                        type: 'varchar',
                    },
                    {
                        name: 'editorId',
                        type: 'varchar',
                    },
                    {
                        name: 'origin',
                        type: 'varchar',
                    },
                    {
                        name: 'details',
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
        await queryRunner.query(`DROP TABLE if exists activity cascade`);
    }

    async createUuidExtenstion(queryRunner: QueryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    }

}
