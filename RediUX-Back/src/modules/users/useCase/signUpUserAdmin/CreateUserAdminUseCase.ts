import { container, inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repository/interface/IUserRepository";
import { EncryptProvider } from "../../../../shared/container/providers/encrypt-provider";
import { AppError } from "../../../../shared/erros/AppError";

interface IRequest {
  email: string;
  password: string;
}
@injectable()
class CreateUserAdminUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    const encryptProvider = container.resolve(EncryptProvider);
    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    password = await encryptProvider.encrypt(password);

    const user = await this.userRepository.create(email, password);

    return user;
  }
}

export { CreateUserAdminUseCase };
