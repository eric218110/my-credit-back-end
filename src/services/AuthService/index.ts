import JWT from "jsonwebtoken";

class AuthService {
  generateToken(email: string): string {
    const { JWT_TOKEN } = process.env;

    const tokenJWT = JWT.sign({ email }, JWT_TOKEN!, {
      expiresIn: "7d",
    });

    return tokenJWT;
  }
}

export const authService = new AuthService();