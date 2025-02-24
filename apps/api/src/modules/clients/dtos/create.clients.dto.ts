import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ description: 'Client name' })
  @IsString()
  readonly clientName: string;
}
