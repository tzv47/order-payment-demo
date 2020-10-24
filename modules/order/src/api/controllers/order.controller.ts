import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Bind, Param, Query, Patch, Body, Post } from "@nestjs/common";
import { OrderRepository } from "../../data/repositories";
import { Order, OrderStatus } from "../../data/models";
import { OrderManager } from "../../core/order/order.manager";
import { CreateOrderDto } from "../../data/dtos/createOrder.dto";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderManager: OrderManager) {}

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

  @Post()
  @Bind(Param("clientId"), Body())
  @ApiOperation({ summary: "Create one order by client" })
  @ApiResponse({ status: 200, type: Order })
  public async createOrder(clientId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderManager.createOrder(createOrderDto, clientId);
  }

  @Patch(":id/cancel")
  @Bind(Param("id"), Body())
  @ApiOperation({ summary: "Pay one order" })
  @ApiResponse({ status: 200, type: Order })
  public async cancelOrder(id: string): Promise<Order> {
    return this.orderRepository.updateOrderStatus(id, OrderStatus.CANCELLED);
  }
}
