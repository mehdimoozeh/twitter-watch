import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('/health')
export class HealthController {
  @Get()
  checkup(): string {
    return 'Everything is up and running!';
  }

  //TODO: health check for services and last time we fetch data from twitter
}
