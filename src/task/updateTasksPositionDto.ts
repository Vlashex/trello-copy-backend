import { IsInt } from 'class-validator';

export class UpdateTasksPositionDto {
  @IsInt()
  readonly id: number

  @IsInt()
  readonly position: number
}
