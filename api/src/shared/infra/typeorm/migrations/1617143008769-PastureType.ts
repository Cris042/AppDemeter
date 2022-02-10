import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PastureType1617143008769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'pastureType',
              columns: 
              [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },

                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },

                {
                    name: 'amountOffood',
                    type: 'number',
                }

              ],
              
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('pastureType');
    }

}
