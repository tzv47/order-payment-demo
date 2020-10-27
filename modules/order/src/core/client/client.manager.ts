import { Injectable, Logger } from "@nestjs/common";
import { Subscribe } from "@briohr/nest-broker";
import { ClientRepository } from "../../data/repositories";
import { plainToClass } from "class-transformer";
import { Client } from "../../data/models";

@Injectable()
export class ClientManager {
  constructor(private clientRepository: ClientRepository) {}

  @Subscribe("USER_CREATED")
  public async createClient({ _id, email }: { _id: string; email: string }): Promise<void> {
    try {
      const newClient = plainToClass(Client, {
        _id,
        email
      });
      await this.clientRepository.create(newClient);
    } catch (error) {
      Logger.error("BROKER USER_CREATED");
      Logger.error(_id);
      Logger.error(error);
    }
  }
}
