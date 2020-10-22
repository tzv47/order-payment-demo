// import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Bind, Param, Query } from "@nestjs/common";

// @ApiTags("Approver")
@Controller("orders")
export class OrderController {
  constructor() {}

  @Get("test")
  public test(): any {
    console.log("works");
    return;
  }
}
