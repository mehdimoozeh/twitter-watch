import { ApiProperty } from '@nestjs/swagger';

export class AudienceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  displayname: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  recentRepliesCount: number;
}
