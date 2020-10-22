import * as bcrypt from "bcrypt";

export class PasswordUtils {
  public static async hash(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(plainPassword, salt);
  }

  public static async check(plainPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash);
  }
}
