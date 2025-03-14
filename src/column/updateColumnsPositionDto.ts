import { IsInt } from 'class-validator';

export class UpdateColumnsPositionDto {
  @IsInt()
  readonly id: number

  @IsInt()
  readonly position: number
}
