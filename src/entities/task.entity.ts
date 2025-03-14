import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ColumnEntity } from "./column.entity";





@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content: string;

    @Column()
    position!: number;

    @ManyToOne(() => ColumnEntity, column => column.tasks)
    column!: ColumnEntity;
}