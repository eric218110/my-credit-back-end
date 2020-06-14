import { getRepository, Repository } from "typeorm";
import { UserEntity } from "../../database/entitys/user.entity";

class UserService {
  private userRepository!: Repository<UserEntity>;

  private singletonRepository() {
    if (this.userRepository === undefined) {
      this.userRepository = getRepository(UserEntity);
    }
  }

  async index(find: { id: string }): Promise<UserEntity | undefined> {
    const { id } = find;
    this.singletonRepository();
    return await this.userRepository.findOne({ id });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.singletonRepository();
    return await this.userRepository.save(user);
  }
}

export const userService = new UserService();
