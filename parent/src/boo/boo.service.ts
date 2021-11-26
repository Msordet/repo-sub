import { Inject } from "@nestjs/common";
import { FooService } from "src/foo/foo.service";

export class BooService {
  constructor(@Inject('FOO_SERVICE') private fooService: FooService) {}
  hi() {
    return `Good morning ${this.fooService.hello()}`
  }
}
