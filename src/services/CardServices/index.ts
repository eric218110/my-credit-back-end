import { getRepository, Repository } from "typeorm";
import { CardEntity } from "../../database/entitys/card.entity";

class CardService {
  private cardRepository!: Repository<CardEntity>;

  private singletonRepository() {
    if (this.cardRepository === undefined) {
      this.cardRepository = getRepository(CardEntity);
    }
  }

  async show(): Promise<CardEntity[] | undefined> {
    try {
      this.singletonRepository();
      return await this.cardRepository.find();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async index(find: { id: string }): Promise<CardEntity | undefined> {
    const { id } = find;
    this.singletonRepository();
    return await this.cardRepository.findOne({ id });
  }

  async create(user: CardEntity): Promise<CardEntity | undefined> {
    this.singletonRepository();
    try {
      return await this.cardRepository.save(user);
    } catch (error) {
      console.log(`Error create card: ${error.detail}`);
      return undefined;
    }
  }

  async edit(card: CardEntity, id: string): Promise<boolean> {
    this.singletonRepository();

    try {
      const update = await this.cardRepository.update({ id }, card);

      if (update.affected !== undefined && update.affected > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async delete(id: string): Promise<boolean> {
    this.singletonRepository();

    try {
      const update = await this.cardRepository.delete({ id });

      if (update.affected !== undefined && update.affected) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}

export const cardService = new CardService();
