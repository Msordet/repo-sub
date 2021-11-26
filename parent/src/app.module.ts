import { Module } from '@nestjs/common';
import { BarModule } from './bar/bar.module';
import { FooModule } from './foo/foo.module';
import { ProjectsModule} from 'child'
import { BooModule } from './boo/boo.module';

@Module({
  imports: [BooModule, ProjectsModule.register({ fooModule: FooModule, barModule: BarModule })],
  controllers: [],
  providers: [],
})
export class AppModule {}
