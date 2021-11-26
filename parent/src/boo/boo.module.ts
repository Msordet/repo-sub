import { Module } from '@nestjs/common';
import { FooModule } from 'src/foo/foo.module';
import { BooService } from './boo.service';

@Module({
  imports: [FooModule],
  providers: [BooService],
  exports: [BooService]
})
export class BooModule {}
