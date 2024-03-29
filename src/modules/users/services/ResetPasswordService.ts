import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UsersTokenRepository);
    // check if token exists
    const userToken = await usersTokenRepository.findByToken(token);
    if(!userToken) {
      throw new AppError('User Token does not exists.');
    }
    // check if user exists
    const user = await usersRepository.findById(userToken.user_id);
    if(!user) {
      throw new AppError('User does not exists.');
    }
    // check if token is expired
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }
    // update password
    user.password = await hash(password, 8);
    await usersRepository.save(user);

}
}

export default ResetPasswordService;