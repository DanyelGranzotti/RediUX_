import * as bcrypt from "bcrypt";

export class EncryptProvider {
  public async encrypt(password: string): Promise<string> {
    try {
      const hashed = await bcrypt.hash(password, 8);
      return hashed;
    } catch (err) {
      throw new Error("Error encrypting password");
    }
  }

  public async IsValidPassword(password: string): Promise<boolean> {
    const minLength = 8;
    const hasNoSpaces = !/\s/.test(password);

    if (password.length < minLength) {
      throw new Error("Password must have at least 8 characters");
    }

    if (!hasNoSpaces) {
      throw new Error("Password must not contain spaces");
    }

    return true;
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(password, hash);
      return isValid;
    } catch (err) {
      throw new Error("Error comparing password");
    }
  }
}
