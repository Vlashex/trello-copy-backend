import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Post(':colId')
  async createOne(@Param('colId') colId: number) {
    return this.taskService.createOne(colId);
  }

  @Put(':taskId/:taskPos/:colId')
  async DeleteDateColumn(
    @Param('taskId') taskId: number, 
    @Param('taskPos') taskPos: number, 
    @Param('colId') colId: number) {
    return this.taskService.updateTasksPosition(taskId, taskPos, colId);
  }
}
