import { getObjectId } from "mongo-seeding";
import * as bcrypt from "bcrypt";

const users = [];

function encryptPassword(password: string, salt: number = 10): string {
  return bcrypt.hashSync(password, salt);
}

const user_1 = {} as any;
user_1._id = getObjectId("abue90@gmail.com") as any;
user_1.email = "abue90@gmail.com";
user_1.password = encryptPassword("password");

const user_2 = {} as any;
user_2._id = getObjectId("jack@demo.com") as any;
user_2.email = "jack@demo.com";
user_2.password = encryptPassword("password");

users.push(user_1, user_2);

export = users;
