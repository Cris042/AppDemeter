import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Vaccine1617143008767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'vaccine',
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
                    name: 'doses',
                    type: 'integer',
                    default: 1,
                },

                {
                    name: 'dosesTime',
                    type: 'integer',
                    isNullable: true,
                },

                {
                    name: 'timeEffective',
                    type: 'integer',
                    isNullable: true,
                },


              ],
              
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('vaccine');
    }

}
