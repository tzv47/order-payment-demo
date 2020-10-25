import { OrderManager } from "../../core/order/order.manager";
import { createMock } from "@golevelup/ts-jest";
import { OrderRepository } from "../../data/repositories";
import { Order, OrderStatus } from "../../data/models";

describe("[Order] Core/OrderManager", () => {
  let orderManager: OrderManager;
  beforeEach(() => {
    const mockOderRepository = createMock<OrderRepository>({
      create: async (order: Order) => {
        return order;
      }
    });

    orderManager = new OrderManager(mockOderRepository, null);
  });

  describe("* Create Order", () => {
    it("should return created order", async () => {
      const data = {
        transactionDate: new Date("2020-11-01T00:00:00.000Z"),
        amount: 200,
        pinNo: "555555"
      };

      const order = await orderManager.createOrder(data, "8dd865a1768e1332789482e3");

      expect(order.amount).toEqual(data.amount);
      expect(order.status).toEqual(OrderStatus.CREATED);
    });
  });
});
