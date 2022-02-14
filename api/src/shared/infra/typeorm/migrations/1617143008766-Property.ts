import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class Property1617143008766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'property',
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
                    name: 'email',
                    type: 'varchar',
                    isNullable: true,
                },

                {
                    name: 'telephone',
                    type: 'integer',
                    isNullable: true,
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
        await queryRunner.dropTable('property');
    }

}
