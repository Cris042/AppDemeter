import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Breed1617143008761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'breed',
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
                    name: 'consumption',
                    type: 'number',
                }

              ],
              
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('breed');
    }

}
