import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Cow1617143008762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'cow',
              columns: 
              [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },

                {
                    name: "idUser",
                    type: "uuid",
                },

                {
                    name: 'breed',
                    type: 'varchar',
                },

                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },

                {
                    name: 'sexo',
                    type: 'varchar',
                },

                {
                    name: 'node',
                    type: 'text',
                    isNullable : true,
                },

                {
                    name: 'matriz',
                    type: 'integer',
                    isNullable : true,
                },

                {
                    name: 'brinco',
                    type: 'integer',
                    isUnique: true,
                    isNullable : true,
                },

                {
                    name: 'status',
                    type: 'varchar',
                },

                {
                    name: 'initialWeight',
                    type: 'integer',
                    isNullable : true,
                },

                {
                    name: 'weight',
                    type: 'integer',
                },

                {
                    name: 'purchaseValue',
                    type: 'integer',
                    isNullable : true,
                },


                {
                    name: 'datePurchase',
                    type: 'varchar',               
                },

                {
                    name: 'dateOfBirth',
                    type: 'varchar',
                },

                {
                    name: 'isBackup',
                    type: 'integer',
                    default: 0,
                },
                
              ],

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('cattle');
    }

}
