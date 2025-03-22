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

  @Get(':userId')
  async findAllWhere(@Param('userId') userId: number) {
    return this.columnService.findAllWhere(userId);
  }

  @Post()
  async createOne() {
    return this.columnService.createOne('new');
  }

  @Put()
  async swapColumns(@Body() positions: UpdateColumnsPositionDto[]) {
    console.log('swap')
    return this.columnService.updateColumnsPosition(positions);
  }

  @Put(':colId')
  async DeleteDateColumn(@Param('colId') colId: number) {
    return this.columnService.deleteColumn(colId);
  }
}

