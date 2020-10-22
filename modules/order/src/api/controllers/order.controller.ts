import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Bind, Param, Query } from "@nestjs/common";
import { OrderRepository } from "../../data/repositories";
import { Order } from "../../data/models";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Get("")
  public async getAll(): Promise<Array<Order>> {
    return this.orderRepository.all({});
  }

  @Get(":id")
  @Bind(Param("id"))
  @ApiOperation({ summary: "Get one order by id." })
  @ApiResponse({ status: 200, type: Order })
  public async getOne(id: string): Promise<Order> {
    return this.orderRepository.get(id);
  }
}
