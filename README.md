# Installation

Run `cd child && pnpm i && pnpm build && cd ../parent && pnpm i && pnpm start:dev`

# Repo explanation

* Both `parent` and `child` directories are NestJS frameworks and should work as stand alone.
* `child`'s `ProjectsModule` is to be imported in `parent`'s `AppModule`.
* `ProjectsModule` imports project modules such as `ProjectAModule`.
* `ProjectsModule` has 2 dependencies: `FooModule` and `BarModule` as we need to import `FooService` and `BarService` in each projects (ex: `ProjectAModule`)

Both apps use `8.2.3` of `@nestjs/common` and `@mestjs/core`.

Starting `parent` throws this error:
```log
[Nest] 54317  - 11/26/2021, 2:15:22 PM   ERROR [ExceptionHandler] Nest can't resolve dependencies of the DiscoveryService (?). Please make sure that the argument ModulesContainer at index [0] is available in the DiscoveryModule context.

Potential solutions:
- If ModulesContainer is a provider, is it part of the current DiscoveryModule?
- If ModulesContainer is exported from a separate @Module, is that module imported within DiscoveryModule?
  @Module({
    imports: [ /* the Module containing ModulesContainer */ ]
  })
```

`ProjectsModule` is a dynamic module that imports the dynamic module projects (e.g. `ProjetAModule`).

In the `child` repo, we want `ProjectAModule` to use the `child`'s `FooService` and `BarService` services.

In the `parent` repo , we want `ProjectAModule` to use `parent`'s `FooService` and `BarService` services.
