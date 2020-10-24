import { Injectable } from "@nestjs/common";
import { Client } from "../../data/models";
import { ClientRepository } from "../../data/repositories";
import { PinNoUtils } from "../security";

@Injectable()
export class ClientManager {
  constructor(private clientRepository: ClientRepository) {}

  public async validatePinNo(id: string, pinNo: string) {
    const client = await this.clientRepository.get(id);
    if (client && (await PinNoUtils.check(pinNo, client.pinNo))) {
      return client;
    }

    return null;
  }

  public async updateBalance(client: Client, amount: number): Promise<void> {
    await this.clientRepository.update(client._id, { ...client, accountBalance: amount });
    return;
  }
}
