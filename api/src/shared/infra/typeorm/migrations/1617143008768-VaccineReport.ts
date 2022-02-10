import { MigrationInterface, QueryRunner , Table} from "typeorm";

export class VaccineReport1617143008768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table({
              name: 'vaccineReport',
              columns: 
              [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },

                {
                    name: 'vaccineID',
                    type: 'integer',
                },

                {
                    name: 'cattleID',
                    type: 'integer',
                },

              ],
              
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable('vaccineReport');
    }

}
