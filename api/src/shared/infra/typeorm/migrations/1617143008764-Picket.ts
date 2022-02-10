import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Picket1617143008764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'picket',
              columns: 
              [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },

                {
                    name: "id_user",
                    type: "uuid",
                },

                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },

                {
                    name: 'countFood',
                    type: 'integer',
                },

                {
                    name: 'type',
                    type: 'varchar',
                },

                {
                    name: 'size',
                    type: 'integer',
                },

                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },

                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },

                {
                    name: 'status',
                    type: 'integer',
                    default: 0,
                },

              ],

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('picket');
    }

}
