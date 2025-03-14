import { ColumnEntity } from "src/entities/column.entity";
import { DataSource } from "typeorm";




export const columnProviders = [
  {
    provide: 'COLUMN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ColumnEntity),
    inject: ['DATA_SOURCE'],
  },
];