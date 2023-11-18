import { ApiProperty } from '@nestjs/swagger';

export class VotingDto {
  @ApiProperty({ type: String, required: true, default: 'proposal number' })
  proposalNumber: string;
  @ApiProperty({ type: String, required: true, default: 'amount' })
  amount: string;
}
