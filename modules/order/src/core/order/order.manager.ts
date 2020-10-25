import { HttpService, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";

import { CreateOrderDto } from "../../data/dtos/createOrder.dto";
import { Order, OrderStatus } from "../../data/models";
import { OrderRepository } from "../../data/repositories";

interface PaymentData {
  clientId: string;
  amount: number;
  pinNo: string;
}

enum PaymentStatus {
  SUCCESS = "success",
  DECLINED = "declined"
}
@Injectable()
export class OrderManager {
  constructor(private orderRepository: OrderRepository, private readonly httpService: HttpService) {}

  public async createOrder(createOrderDto: CreateOrderDto, clientId: string): Promise<Order> {
    const { pinNo, ...rest } = createOrderDto;

    const order = plainToClass(Order, { clientId, status: OrderStatus.CREATED, ...rest });

    const createdOrder = await this.orderRepository.create(order);
    const updatedOrder = await this.makePayment(createdOrder, pinNo);
    return updatedOrder;
  }

  private async makePayment(order: Order, pinNo: string): Promise<Order> {
    const paymentStatus = await this.getPaymentStatus({ clientId: order.clientId, amount: order.amount, pinNo });

    const updatedOrder = await this.orderRepository.updateOrderStatus(
      order._id,
      paymentStatus === PaymentStatus.SUCCESS ? OrderStatus.DELIVERED : OrderStatus.CANCELLED
    );
    return updatedOrder;
  }

  private async getPaymentStatus(paymentData: PaymentData): Promise<PaymentStatus> {
    const endpoint = `http://payment:8031/payment`;
    return this.httpService
      .post(endpoint, paymentData)
      .pipe(
        map(response => {
          return response.data.status;
        })
      )
      .toPromise()
      .catch(err => console.error(err));
  }
}
