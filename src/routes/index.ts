import { HTTP_METHODS } from "../constants";
import { UserController } from "../controller/UserController";
import { UserMiddleware } from "../middlewares/UserMiddleware";
import { AuthController } from "../controller/AuthController";
import { CardController } from "../controller/CardController";
import { CardMiddleware } from "../middlewares/CardMiddleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
interface IRouter {
  path: string;
  method: HTTP_METHODS;
  action: Function;
  middlewares?: Array<Function>;
}

const userMiddleware = new UserMiddleware();

export const Routes: IRouter[] = [
  {
    path: "/user/:id",
    method: HTTP_METHODS.GET,
    action: new UserController().index,
    middlewares: [userMiddleware.findOneUser],
  },
  {
    path: "/user",
    method: HTTP_METHODS.POST,
    action: new UserController().create,
    middlewares: [userMiddleware.createUser],
  },
  {
    path: "/user/firebase",
    method: HTTP_METHODS.POST,
    action: new UserController().createUserInFirebase,
    middlewares: [userMiddleware.createUser],
  },
  {
    path: "/auth/facebook",
    method: HTTP_METHODS.POST,
    action: new AuthController().authFacebook,
    middlewares: [userMiddleware.createUserWithFacebook],
  },
  {
    path: "/auth/email",
    method: HTTP_METHODS.POST,
    action: new AuthController().authEmailAndPassword,
    middlewares: [new AuthMiddleware().signWithEmailAndPassword],
  },
  {
    path: "/card",
    method: HTTP_METHODS.GET,
    action: new CardController().show,
    middlewares: [new AuthMiddleware().isAuthenticate],
  },
  {
    path: "/card",
    method: HTTP_METHODS.POST,
    action: new CardController().create,
    middlewares: [new CardMiddleware().create],
  },
];
