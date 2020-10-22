import { getObjectId } from "mongo-seeding";
import { Order, OrderStatus } from "../../../src/data/models";

const orders = [];

const order_1 = {} as Order;
const order_2 = {} as Order;
const order_3 = {} as Order;
const order_4 = {} as Order;

order_1._id = getObjectId("order-1") as any;
order_1.clientId = getObjectId("abue90@gmail.com") as any;
order_1.transactionDate = new Date(2020, 4, 7);
order_1.amount = 200;
order_1.status = OrderStatus.CONFIRMED;

order_2._id = getObjectId("order-2") as any;
order_2.clientId = getObjectId("abue90@gmail.com") as any;
order_2.transactionDate = new Date(2020, 9, 12);
order_2.amount = 10.75;
order_2.status = OrderStatus.CANCELLED;

order_3._id = getObjectId("order-3") as any;
order_3.clientId = getObjectId("jack@demo.com") as any;
order_3.transactionDate = new Date(2020, 1, 5);
order_3.amount = 1000;
order_3.status = OrderStatus.DELIVERED;

order_4._id = getObjectId("order-4") as any;
order_4.clientId = getObjectId("jack@demo.com") as any;
order_4.transactionDate = new Date(2020, 10, 1);
order_4.amount = 200;
order_4.status = OrderStatus.CREATED;

orders.push(order_1, order_2, order_3, order_4);

export = orders;
