import { getObjectId } from "mongo-seeding";
import { Client } from "../../../src/data/models";

import * as bcrypt from "bcrypt";

const encryptPinNo = (password: string, salt: number = 6): string => {
  return bcrypt.hashSync(password, salt);
};

const clients = [];

const client_1 = {} as Client;

client_1._id = getObjectId("abue90@gmail.com") as any;
client_1.name = "Abu";
client_1.address = "123 ABC Roads, 5000, Kuala Lumpur";
client_1.phoneNumber = "0112345678";
client_1.pinNo = encryptPinNo("123456");
client_1.accountBalance = 1000;

const client_2 = {} as Client;
client_2._id = getObjectId("jack@demo.com") as any;
client_2.name = "Jack";
client_2.address = "";
client_2.phoneNumber = "";
client_2.pinNo = encryptPinNo("555555");
client_1.accountBalance = 700;

clients.push(client_1, client_2);

export = clients;
