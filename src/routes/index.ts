import { HTTP_METHODS } from "../constants";
import { UserController } from "../controller/UserController";

interface IRouter {
  path: string;
  method: HTTP_METHODS;
  action: Function;
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
    action: new UserController().save,
  },
];
