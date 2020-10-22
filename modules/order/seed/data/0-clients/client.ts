import { getObjectId } from "mongo-seeding";
import { Client } from "../../../src/data/models";

const clients = [];

const client_1 = {} as Client;

client_1._id = getObjectId("abue90@gmail.com") as any;
client_1.name = "Abu";
client_1.address = "123 ABC Roads, 5000, Kuala Lumpur";
client_1.phoneNumber = "0112345678";

const client_2 = {} as Client;
client_2._id = getObjectId("jack@demo.com") as any;
client_2.name = "Jack";
client_2.address = "";
client_2.phoneNumber = "";

clients.push(client_1, client_2);

export = clients;
