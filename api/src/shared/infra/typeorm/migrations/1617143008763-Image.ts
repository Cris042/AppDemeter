import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Image1617143008763 implements MigrationInterface {

    public async up( queryRunner: QueryRunner ): Promise<void> 
    {     
        await queryRunner.createTable(
            new Table({
              name: 'images',
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
                    name: 'path',
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
       await queryRunner.dropTable('images');
    }

}
