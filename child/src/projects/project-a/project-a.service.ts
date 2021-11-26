import { Inject } from "@nestjs/common";
import { BarService } from "src/bar/bar.service";
import { FooService } from "src/foo/foo.service";
import { BAR_SERVICE, FOO_SERVICE } from "../apps.types";

export class ProjectAService {
  constructor(
    @Inject(FOO_SERVICE) private fooService: FooService,
    @Inject(BAR_SERVICE) private barService: BarService
  ) {}

  hola() {
    return this.fooService.hello()
  }
}
