import { HttpException, HttpService, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { AxiosResponse } from "axios";

import { CreateOrderDto } from "../../api/dtos/createOrder.dto";
import { Order, OrderStatus } from "../../data/models";
import { OrderRepository } from "../../data/repositories";

import { catchError, map } from "rxjs/operators";

interface PaymentData {
  clientId: string;
  amount: number;
  pinNo: string;
}

enum PaymentStatus {
  SUCCESS = "success",
  DECLINED = "declined"
}

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

@Injectable()
export class OrderManager {
  constructor(private orderRepository: OrderRepository, private readonly httpService: HttpService) {}

  public async createOrder(createOrderDto: CreateOrderDto, clientId: string): Promise<Order> {
    const { pinNo, ...rest } = createOrderDto;

    const order = plainToClass(Order, { clientId, status: OrderStatus.CREATED, ...rest });

    const createdOrder = await this.orderRepository.create(order);
    return createdOrder;
  }

  public async makePayment(order: Order, pinNo: string): Promise<Order> {
    const paymentStatus = await this.getPaymentStatus({ clientId: order.clientId, amount: order.amount, pinNo });

    const updatedOrder = await this.orderRepository.updateOrderStatus(
      order._id,
      paymentStatus === PaymentStatus.SUCCESS ? OrderStatus.CONFIRMED : OrderStatus.CANCELLED
    );

    // Non blocking, return above process result first
    delay(10000).then(() => {
      if (paymentStatus === PaymentStatus.SUCCESS) {
        this.orderRepository.updateOrderStatus(order._id, OrderStatus.DELIVERED);
      }
    });

    return updatedOrder;
  }

  private async getPaymentStatus(paymentData: PaymentData): Promise<PaymentStatus> {
    const endpoint = `http://payment:8031/payment`;
    return this.httpService
      .post(endpoint, paymentData)
      .pipe(
        catchError(e => {
          throw new HttpException(e.response.data, e.response.status);
        }),
        map((response: AxiosResponse<{ status: PaymentStatus }>) => {
          return response.data.status;
        })
      )
      .toPromise();
  }
}
