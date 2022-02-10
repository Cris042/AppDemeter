import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PicketUsed1617143008765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'picketUsed',
              columns: 
              [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },

                {
                    name: 'dateEntryPicket',
                    type: 'varchar',
                },

                {
                    name: 'dateExitPicket',
                    type: 'varchar',
                    isNullable: true,
                },

                {
                    name: 'picketID',
                    type: 'integer',
                },

                {
                    name: 'cattleID',
                    type: 'varchar',
                },

                {
                    name: 'occupancyRate',
                    type: 'integer',
                },

              ],
              
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('picketUsed');
    }

}
