import { Type } from '@nestjs/common';

import {
  AppModuleOptions,
  APP_OPTIONS,
  BAR_SERVICE,
  DYNAMIC_BAR_SERVICE,
  DYNAMIC_FOO_SERVICE,
  FOO_SERVICE,
} from './apps.types';

import { createConfigurableDynamicRootModule, IConfigurableDynamicRootModule } from '../utils/dynamic';

const DYNAMIC_PROVIDERS = [
  {
    provide: DYNAMIC_FOO_SERVICE,
    inject: [APP_OPTIONS],
    useFactory: (options: AppModuleOptions) => options.fooService,
  },
  {
    provide: DYNAMIC_BAR_SERVICE,
    inject: [APP_OPTIONS],
    useFactory: (options: AppModuleOptions) => options.barService,
  },
];

export const AbstractCommunityApp = <T>() =>
  createConfigurableDynamicRootModule<T, AppModuleOptions>(APP_OPTIONS, {
    providers: DYNAMIC_PROVIDERS,
  });

export const DynamicApps = ({
  apps,
  imports,
}: {
  apps: IConfigurableDynamicRootModule<Type, AppModuleOptions>[];
  imports: Type[];
}) =>
  apps.map(app =>
    app.forRootAsync(app, {
      imports,
      inject: [FOO_SERVICE, BAR_SERVICE],
      useFactory: (
        fooService: AppModuleOptions['fooService'],
        barService: AppModuleOptions['barService'],
      ) => {
        return {
          fooService,
          barService,
        };
    },
    }),
  );
