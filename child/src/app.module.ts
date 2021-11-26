import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/apps.module';
import { BarModule } from './bar/bar.module';
import { BooModule } from './boo/boo.module';
import { FooModule } from './foo/foo.module';

@Module({
  imports: [
    FooModule,
    BooModule,
    ProjectsModule.register({ fooModule: FooModule, barModule: BarModule })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
