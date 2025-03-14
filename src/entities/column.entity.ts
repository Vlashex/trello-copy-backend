import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";




@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    position!: number;

    @Column({nullable: false})
    title: string;

    @OneToMany(() => TaskEntity, task => task.column)
    tasks: TaskEntity[];
}