import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUserService {
public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const findUsers = usersRepository.find();

    return findUsers;
}
}

export default ListUserService;