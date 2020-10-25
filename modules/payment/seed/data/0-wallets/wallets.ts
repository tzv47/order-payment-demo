import { getObjectId } from "mongo-seeding";

import * as bcrypt from "bcrypt";
import { Wallet } from "../../../src/data/model";

const encryptPinNo = (password: string, salt: number = 6): string => {
  return bcrypt.hashSync(password, salt);
};

const wallets = [];

const wallet_1 = {} as Wallet;

wallet_1._id = getObjectId("abue90@gmail.com") as any;
wallet_1.clientId = getObjectId("abue90@gmail.com") as any;
wallet_1.pinNo = encryptPinNo("123456");
wallet_1.balance = 1000;

const wallet_2 = {} as Wallet;

wallet_2._id = getObjectId("jack@demo.com") as any;
wallet_2.clientId = getObjectId("jack@demo.com") as any;
wallet_2.pinNo = encryptPinNo("555555");
wallet_2.balance = 700;

wallets.push(wallet_1, wallet_2);

export = wallets;
