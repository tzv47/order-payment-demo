import * as bcrypt from "bcrypt";

export class PinNoUtils {
  public static async check(plainPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash);
  }
}
