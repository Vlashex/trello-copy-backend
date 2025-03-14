import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ColumnEntity } from 'src/entities/column.entity';
import { TaskEntity } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateColumnsPositionDto } from './updateColumnsPositionDto';


@Injectable()
export class ColumnService {
  constructor(
    @Inject('COLUMN_REPOSITORY')
    private columnsRepository: Repository<ColumnEntity>,
    @Inject('USERS_REPOSITORY')
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async findAll() {
    return this.columnsRepository.find();
  }

  async createOne(title: string) {
    const lastColumn = await this.columnsRepository.findOne({
      where: {},
      order: { position: 'DESC' },
    });
    const lastPosition = lastColumn ? lastColumn.position : 0;
    const newColumn = this.columnsRepository.create({
      title: title,
      position: lastPosition + 1,
    });

    return await this.columnsRepository.save(newColumn);
  }

  
  async updateColumnsPosition(positions: UpdateColumnsPositionDto[]) {
    const columns = await this.columnsRepository.find();

    for (const pos of positions) {
        const columnIndex = columns.findIndex((el) => el.id === pos.id);
        columns[columnIndex].position = pos.position;
    }

    console.log(columns)

    this.columnsRepository.save(columns);
  }

  async moveTask(columnId: number, taskId: number): Promise<ColumnEntity> {
    const column = await this.columnsRepository.findOne({
      where: { id: columnId },
    });
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });

    if (!column || !task) throw new Error('Task or Colun not found');

    task.column = column;

    this.tasksRepository.save(task);

    return column;
  }
}
