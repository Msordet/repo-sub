import { DynamicModule, Module, Type } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DynamicApps } from './apps.utils';
import { ProjectAModule } from './project-a/projec-a.module';

type RegisteredDynamicModules = {
  fooModule: Type;
  barModule: Type;
};

@Module({})
export class ProjectsModule {
  static register({ fooModule, barModule }: RegisteredDynamicModules): DynamicModule {
    return {
      module: ProjectsModule,
      imports: [
        DiscoveryModule,
        ...DynamicApps({
          apps: [ProjectAModule],
          imports: [fooModule, barModule],
        }),
      ],
    };
  }
}
