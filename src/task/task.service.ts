import { Inject, Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTasksPositionDto } from './updateTasksPositionDto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll() {
    return this.taskRepository.find();
  }

  async createOne(colId: number) {
    const lastTask = await this.taskRepository.findOne({
      where: {},
      order: { position: 'DESC' },
    });
    const lastPosition = lastTask ? lastTask.position : 0;
    const newTask = this.taskRepository.create({
      content: 'New',
      position: lastPosition + 1,
      column: { id: colId },
    });

    try {
      const savedTask = await this.taskRepository.save(newTask);

      savedTask.column

      return {...savedTask, columnId: savedTask.column.id as number};
    } catch(err) {
      console.error(err)
      throw new Error("Failed to seve newTask")
    }
  }

  async updateTasksPosition(
    taskId: number,
    taskPosition: number,
    colId: number,
  ) {
    this.taskRepository.update(taskId, {
      column: {id: colId}
    })
    const tasks = (await this.taskRepository.find({
      where: { column: { id: colId } },
      order: { position: 'ASC' },
    })).filter((el) => el.id !== taskId);

    let i = 0;
    tasks.forEach(element => {
      if (i != taskPosition)
        element.position = Number(i);
      i++;
    });

    const task = await this.taskRepository.findOneBy({id: taskId});
    task.position = Number(taskPosition as number);

    this.taskRepository.save(tasks);
  }
}
