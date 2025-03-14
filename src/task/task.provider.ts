import { TaskEntity } from "src/entities/task.entity";
import { DataSource } from "typeorm";




export const columnProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskEntity),
    inject: ['DATA_SOURCE'],
  },
];