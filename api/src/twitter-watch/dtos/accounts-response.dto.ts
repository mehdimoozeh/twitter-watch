import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  displayname: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  username: string;
}

export class AccountsResponseDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [UserDto] })
  accounts: UserDto[];
}
