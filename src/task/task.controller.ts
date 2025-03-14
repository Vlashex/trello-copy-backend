import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTasksPositionDto } from './updateTasksPositionDto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Post()
  async createOne() {
    return this.taskService.createOne('new');
  }

  @Put()
  async swapTasks(@Body() positions: UpdateTasksPositionDto[]) {
    return this.taskService.updateTasksPosition(positions);
  }
}
