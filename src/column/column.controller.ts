import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ColumnService } from './column.service';
import { UpdateColumnsPositionDto } from './updateColumnsPositionDto';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  async findAll() {
    return this.columnService.findAll();
  }

  @Post()
  async createOne() {
    return this.columnService.createOne('new');
  }

  @Put()
  async swapColumns(@Body() positions: UpdateColumnsPositionDto[]) {
    return this.columnService.updateColumnsPosition(positions);
  }

  @Put(':taskId/move/:newColumnId')
  async moveTask(
    @Param('taskId') taskId: number,
    @Param('newColumnId') newColumnId: number,
  ) {
    return this.moveTask(taskId, newColumnId);
  }
}
