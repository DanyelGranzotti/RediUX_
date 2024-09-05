import { container, inject, injectable } from "tsyringe";
import { EncryptProvider } from "../../../../shared/container/providers/encrypt-provider";
import { IUserRepository } from "../../repository/interface/IUserRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/erros/AppError";
interface IResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthUserAdminUseCase {
  constructor(
    @inject("UserRepository")
    private repository: IUserRepository,
  ) {}

  async execute({ email, password }) {
    const user = await this.repository.findByEmail(email);
    const encryptProvider = container.resolve(EncryptProvider);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const passwordIsValid = await encryptProvider.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new AppError("Invalid password", 401);
    }

    const token = sign({}, "6c42b2e01bafd16f1ac50e358a679f6d", {
      subject: user.email,
      expiresIn: "1h",
    });

    const tokenReturn: IResponse = {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthUserAdminUseCase };
