// from https://github.com/golevelup/nestjs/blob/master/packages/modules/src/dynamicModules.ts
// pulled here because the package is still on nest 7

import { DynamicModule, Provider, Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { get } from 'lodash';
import { Subject } from 'rxjs';

type InjectionToken = string | symbol | Type<any>;

export interface ModuleConfigFactory<T> {
  createModuleConfig(): Promise<T> | T;
}

export interface AsyncModuleConfig<T> extends Pick<ModuleMetadata, 'imports' | 'exports'> {
  useExisting?: {
    value: ModuleConfigFactory<T>;
    provide?: InjectionToken;
  };
  useClass?: Type<ModuleConfigFactory<T>>;
  useFactory?: (...args: any[]) => Promise<T> | T;
  inject?: any[];
}

export function createModuleConfigProvider<T>(provide: InjectionToken, options: AsyncModuleConfig<T>): Provider[] {
  if (options.useFactory) {
    return [
      {
        provide,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }

  const optionsProvider = {
    provide,
    useFactory: async (moduleConfigFactory: ModuleConfigFactory<T>) => {
      return moduleConfigFactory.createModuleConfig();
    },
    inject: [
      options.useClass || get(options, 'useExisting.provide', (options.useExisting as any).value.constructor.name),
    ],
  };

  if (options.useClass) {
    return [
      optionsProvider,
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  if (options.useExisting) {
    return [
      optionsProvider,
      {
        provide: options.useExisting.provide || options.useExisting.value.constructor.name,
        useValue: options.useExisting.value,
      },
    ];
  }

  return [];
}

export interface IConfigurableDynamicRootModule<T, U> {
  new (): Type<T>;
  moduleSubject: Subject<DynamicModule>;
  forRootAsync(moduleCtor: Type<T>, asyncModuleConfig: AsyncModuleConfig<U>): DynamicModule;
}

export function createConfigurableDynamicRootModule<T, U>(
  moduleConfigToken: InjectionToken,
  moduleProperties: Partial<Pick<ModuleMetadata, 'imports' | 'exports' | 'providers' | 'controllers'>> = {
    imports: [],
    exports: [],
    providers: [],
  },
) {
  abstract class DynamicRootModule {
    static moduleSubject = new Subject<DynamicModule>();

    static forRootAsync(moduleCtor: Type<T>, asyncModuleConfig: AsyncModuleConfig<U>): DynamicModule {
      const dynamicModule = {
        module: moduleCtor,
        imports: [...(asyncModuleConfig.imports || []), ...(moduleProperties.imports || [])],
        exports: [...(asyncModuleConfig.exports || []), ...(moduleProperties.exports || [])],
        providers: [
          ...createModuleConfigProvider(moduleConfigToken, asyncModuleConfig),
          ...(moduleProperties.providers || []),
        ],
      };

      DynamicRootModule.moduleSubject.next(dynamicModule);

      return dynamicModule;
    }
  }

  return DynamicRootModule as IConfigurableDynamicRootModule<T, U>;
}
