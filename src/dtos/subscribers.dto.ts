import { ApiProperty } from '@nestjs/swagger';

export class SubscribersDto {
  @ApiProperty({ type: String, required: true, default: 'My Address' })
  address: string;
}
