import { Module } from '@nestjs/common';
import { BAR_SERVICE } from 'src/projects/apps.types';
import { BarService } from './bar.service';

@Module({
  providers: [
    {
      provide: BAR_SERVICE,
      useClass: BarService,
    },
  ],
  exports: [BAR_SERVICE]
})
export class BarModule {}
