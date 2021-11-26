import { Module } from '@nestjs/common';
import { FOO_SERVICE } from 'src/projects/apps.types';
import { FooService } from './foo.service';

@Module({
  providers: [
    {
      provide: FOO_SERVICE,
      useClass: FooService,
    },
  ],
  exports: [FOO_SERVICE]
})
export class FooModule {}
