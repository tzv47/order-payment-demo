import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { CreateOrderDto } from "../../data/dtos/createOrder.dto";
import { Client, Order, OrderStatus } from "../../data/models";
import { ClientRepository, OrderRepository } from "../../data/repositories";
import { ClientManager } from "../client/client.manager";

@Injectable()
export class OrderManager {
  constructor(private orderRepository: OrderRepository, private clientManager: ClientManager) {}

  public async createOrder(createOrderDto: CreateOrderDto, clientId: string): Promise<Order> {
    const { pinNo, ...rest } = createOrderDto;
    const order = plainToClass(Order, { clientId, status: OrderStatus.CREATED, ...rest });
    await this.orderRepository.create(order);
    return this.makePayment(order, pinNo);
  }

  private async makePayment(order: Order, pinNo: string): Promise<Order> {
    // make API call to payment
    // order.status = OrderStatus.DELIVERED;

    const updatedOrder = await this.orderRepository.updateOrderStatus(order._id, OrderStatus.DELIVERED);
    return updatedOrder;
  }
}
