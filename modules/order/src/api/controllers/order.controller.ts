import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Bind, Param, Query, Patch, Body, Post } from "@nestjs/common";
import { OrderRepository } from "../../data/repositories";
import { Order, OrderStatus } from "../../data/models";
import { OrderManager } from "../../core/order/order.manager";
import { CreateOrderDto } from "../dtos/createOrder.dto";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderManager: OrderManager) {}

  @Get("")
  @Bind(Query())
  @ApiOperation({ summary: "Get all orders." })
  @ApiResponse({ status: 200, type: Order, isArray: true })
  public async getAll(query: { clientId: string }): Promise<Array<Order>> {
    const { clientId } = query;
    return this.orderRepository.all(clientId ? { clientId } : {});
  }

  @Get(":id")
  @Bind(Param("id"), Query())
  @ApiOperation({ summary: "Get one order by id." })
  @ApiResponse({ status: 200, type: Order })
  public async getOne(id: string, query: { clientId: string }): Promise<Order> {
    const { clientId } = query;
    return this.orderRepository.get(id, clientId ? { clientId } : {});
  }

  @Post("client/:clientId")
  @Bind(Param("clientId"), Body())
  @ApiOperation({ summary: "Create one order by client" })
  @ApiResponse({ status: 200, type: Order })
  public async createOrder(clientId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = await this.orderManager.createOrder(createOrderDto, clientId);
    return this.orderManager.makePayment(createdOrder, createOrderDto.pinNo);
  }

  @Patch(":id/cancel")
  @Bind(Param("id"))
  @ApiOperation({ summary: "Cancel one order" })
  @ApiResponse({ status: 200, type: Order })
  public async cancelOrder(id: string): Promise<Order> {
    return this.orderRepository.updateOrderStatus(id, OrderStatus.CANCELLED);
  }
}
