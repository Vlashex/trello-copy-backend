import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { TaskEntity } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTasksPositionDto } from './updateTasksPositionDto';


@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<TaskEntity>,
    @Inject('USERS_REPOSITORY')
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async findAll() {
    return this.taskRepository.find();
  }

  async createOne(title: string) {
    const lastTask = await this.taskRepository.findOne({
      where: {},
      order: { position: 'DESC' },
    });
    const lastPosition = lastTask ? lastTask.position : 0;
    const newTask = this.taskRepository.create({
      content: title,
      position: lastPosition + 1,
    });

    return await this.taskRepository.save(newTask);
  }

  
  async updateTasksPosition(positions: UpdateTasksPositionDto[]) {
    const columns = await this.taskRepository.find();

    for (const pos of positions) {
        const columnIndex = columns.findIndex((el) => el.id === pos.id);
        columns[columnIndex].position = pos.position;
    }

    console.log(columns)

    this.taskRepository.save(columns);
  }


}
