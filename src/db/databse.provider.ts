import { ColumnEntity } from "src/entities/column.entity";
import { TaskEntity } from "src/entities/task.entity";
import { UserEntity } from "src/entities/user.entity";
import { DataSource } from "typeorm";


export const dbProviders = [
    {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: "postgres",
        password: "postgres",
        database: "trello",
        entities: [
          UserEntity,
          ColumnEntity,
          TaskEntity, 
          __dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
]