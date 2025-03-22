import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnEntity } from "./column.entity";




@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(()=>UserEntity, user => user.columns, {onDelete: 'CASCADE'})
    columns: ColumnEntity
}