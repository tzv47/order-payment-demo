import { PaymentManager } from "../../core/payment.manager";
import { createMock } from "@golevelup/ts-jest";
import { Payment, PaymentStatus } from "../../data/model";
import { PaymentRepository, WalletRepository } from "../../data/repositories";
import * as wallets from "../../../seed/data/0-wallets/wallets";
import { getObjectId } from "mongo-seeding";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";

describe("[Payment] Core/PaymentManager", () => {
  let paymentManager: PaymentManager;
  const mockPayment1 = {
    _id: "5f953ff98051b900416ed1dd",
    paymentDate: new Date("2020-10-25T09:06:01.696Z"),
    amount: 200,
    ref: "8dd865a1768e1332789482e3",
    status: PaymentStatus.PENDING
  } as Payment;

  const mockWallets = wallets;
  beforeEach(() => {
    const mockPaymentRepository = createMock<PaymentRepository>({
      create: async (payment: Payment) => {
        return payment;
      },
      updatePaymentStatus: async (id: string, status: PaymentStatus) => {
        if (id === mockPayment1._id) {
          mockPayment1.status = status;
          return mockPayment1;
        }
      }
    });

    const mockWalletRepository = createMock<WalletRepository>({
      getWalletByClient: async (clientId: string) => {
        return mockWallets.find(wallet => wallet.clientId.valueOf().toString() === clientId.valueOf().toString());
      },
      updateWalletBalance: async (_id: string, amount: number) => {
        const wallet = mockWallets.find(wallet => wallet._id.toString() === _id);
        wallet.balance = wallet.balance - amount;
        return wallet;
      }
    });

    paymentManager = new PaymentManager(mockPaymentRepository, mockWalletRepository, null);
  });

  describe("* Create Payment with correct pin and enough balance", () => {
    it("should return created order", async () => {
      const data = {
        transactionDate: new Date("2020-11-01T00:00:00.000Z"),
        amount: 200,
        pinNo: "123456",
        clientId: getObjectId("abue90@gmail.com") as any
      };

      const payment = await paymentManager.createPayment(data);
      expect(payment.status).toEqual(PaymentStatus.PENDING);
    });
  });

  describe("* Create Payment with non existing client", () => {
    it("should throw unauthorized exception", async () => {
      const data = {
        transactionDate: new Date("2020-11-01T00:00:00.000Z"),
        amount: 200,
        pinNo: "123456",
        clientId: getObjectId("abc@gmail.com") as any
      };
      try {
        const payment = await paymentManager.createPayment(data);
      } catch (error) {
        expect(error).toEqual(new UnauthorizedException());
      }
    });
  });

  describe("* Create Payment with not enough wallet balance", () => {
    it("should throw unauthorized exception", async () => {
      const data = {
        transactionDate: new Date("2020-11-01T00:00:00.000Z"),
        amount: 10000,
        pinNo: "55555",
        clientId: getObjectId("jack@demo.com") as any
      };
      try {
        const payment = await paymentManager.createPayment(data);
      } catch (error) {
        expect(error).toEqual(new BadRequestException("Insufficient Wallet"));
      }
    });
  });
});
