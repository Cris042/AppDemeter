import {
    Entity,
    Column,
    PrimaryColumn,
} from 'typeorm';

@Entity('vaccine')

export default class Vaccine
{
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    doses: number;

    @Column()
    dosesTime: number;

    @Column()
    timeEffective: number;

}
