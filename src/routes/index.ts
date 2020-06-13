import { HTTP_METHODS } from "../constants";
import { UserController } from "../controller/UserController";
import { UserMiddleware } from "../middlewares/UserMiddleware";

interface IRouter {
  path: string;
  method: HTTP_METHODS;
  action: Function;
  middleawre?: Function;
}

export const Routes: IRouter[] = [
  {
    path: "/user",
    method: HTTP_METHODS.GET,
    action: new UserController().getAll,
  },
  {
    path: "/user",
    method: HTTP_METHODS.POST,
    action: new UserController().create,
    middleawre: new UserMiddleware().createUser,
  },
];
