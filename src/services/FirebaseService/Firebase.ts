import * as firebaseAdmin from "firebase-admin";
import { config } from "dotenv";

export class MyFirebaseApplication {
  private static instance: firebaseAdmin.app.App;

  private constructor() {}

  initialAppFirebase() {}

  static getInstance(): firebaseAdmin.app.App {
    config();
    const {
      GOOGLE_APPLICATION_CREDENTIALS,
      FIREBASE_DATABASE_URL,
    } = process.env;

    const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS !== undefined
      ? GOOGLE_APPLICATION_CREDENTIALS
      : "D:\\src\\service-account-file.json");

    if (this.instance === undefined) {
      this.instance = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: FIREBASE_DATABASE_URL,
      });
    }

    return this.instance;
  }

  static getRefDatabase(): string {
    return "my-credit/saving-data/back-end/users";
  }
}
