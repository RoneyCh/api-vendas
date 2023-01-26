import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UsersTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exists.');
    }

    const token = await usersTokenRepository.generate(user.id);

    //console.log(token);
    await EtherealMail.sendMail({
      to: email,
      body: `Olá, ${user.name}. Token de acesso: ${token?.token}`
    });

}
}

export default SendForgotPasswordEmailService;