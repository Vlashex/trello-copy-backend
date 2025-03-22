import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";




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

    @ManyToOne(()=>ColumnEntity, column=>column.user)
    user: UserEntity
}