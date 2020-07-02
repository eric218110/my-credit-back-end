import { Response, Request } from "express";
import { cardService } from "../../services/CardServices";
import { CardEntity } from "../../database/entitys/card.entity";

export class CardController {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const card = await cardService.index({ id });
    return response.json(card);
  }

  async show(request: Request, response: Response) {
    const userId = request.headers.userid?.toString();
    const card = await cardService.show(userId!);
    response.json({ card });
  }

  async create(request: Request, response: Response) {
    const userId = request.headers.userid?.toString();
    console.log(userId);
    try {
      const card = new CardEntity();
      card.name = request.body.name;
      card.number = request.body.number;
      card.holderName = request.body.holderName;
      card.flag = request.body.flag;
      card.balance = request.body.balance;
      card.backgroundColor = request.body.backgroundColor;

      const newCard = await cardService.create(card, userId!);

      return newCard !== undefined
        ? response.json({
            card: {
              name: card.name,
              number: card.number,
              holderName: card.holderName,
              flag: card.flag,
              balance: card.balance,
              backgroundColor: card.backgroundColor,
            },
          })
        : response.status(401).json({ erro: "Card not create" });
    } catch (error) {
      return response.status(401).json({
        error: error.message,
        message: `Not create card`,
      });
    }
  }

  async edit(request: Request, response: Response) {
    try {
      const card = new CardEntity();
      const id = request.params.id;
      card.name = request.body.name;
      card.number = request.body.number;
      card.holderName = request.body.holderName;
      card.flag = request.body.flag;
      card.balance = request.body.balance;
      card.backgroundColor = request.body.backgroundColor;

      const update = await cardService.edit(card, id);

      return update
        ? response.json({ message: "card update", card })
        : response.status(401).json({ error: "Not update" });
    } catch (error) {
      return response
        .status(401)
        .json({ error: "Card note exist, not update" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      return (await cardService.delete(id))
        ? response.json({ message: "card deleted" })
        : response.status(401).json({ error: "Card note exist, not deleted" });
    } catch (error) {
      console.log(error);
      return response.status(401).json({ error: "Not Delete" });
    }
  }

  async getAllCard(request: Request, response: Response) {}
}
