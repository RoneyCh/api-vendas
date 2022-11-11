import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UsersRepository  extends Repository<User>{

  public async findByName(name: string): Promise<User | undefined> {
    const findUser = await this.findOne({
      where: { name },
    });

    return findUser;
}

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.findOne({
      where: { email },
    });

    return findUser;
  }
}

export default UsersRepository;