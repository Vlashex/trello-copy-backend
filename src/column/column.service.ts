import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ColumnEntity } from 'src/entities/column.entity';
import { Repository } from 'typeorm';
import { UpdateColumnsPositionDto } from './updateColumnsPositionDto';


@Injectable()
export class ColumnService {
  constructor(
    @Inject('COLUMN_REPOSITORY')
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async findAll() {
    return this.columnsRepository.find({
        relations: ['tasks']
    });
  }

  async findAllWhere(userId) {
    return this.columnsRepository.find({
        where: {user: {id: userId}},
        relations: ['tasks']
    });
  }

  async createOne(title: string) {
    const lastColumn = await this.columnsRepository.findOne({
      where: {},
      order: { position: 'DESC' },
    });
    const lastPosition = Number(lastColumn ? lastColumn.position : 0);
    const newColumn = this.columnsRepository.create({
      title: title,
      position: Number(lastPosition + 1),
    });

    try {
      await this.columnsRepository.save(newColumn);
    } catch(err) {
      console.error(err)
      throw new Error("Failed to save newColumn")
    }
    
    return newColumn
  }

  async deleteColumn(colId: number) {
    return this.columnsRepository.delete(colId);
  }

  
  async updateColumnsPosition(positions: UpdateColumnsPositionDto[]) {
    const columns = await this.columnsRepository.find();

    for (const pos of positions) {
        const columnIndex = columns.findIndex((el) => el.id === pos.id);
        columns[columnIndex].position = Number(pos.position);
    }

    console.log(columns)

    this.columnsRepository.save(columns);
  }
}