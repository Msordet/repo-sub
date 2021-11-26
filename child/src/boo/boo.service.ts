import { Inject } from "@nestjs/common";
import { FOO_SERVICE } from "src/projects/apps.types";
import { FooService } from "src/foo/foo.service";

export class BooService {
  constructor(@Inject(FOO_SERVICE) private fooService: FooService) {}
  hi() {
    return `Hi ${this.fooService.hello()}`
  }
}
