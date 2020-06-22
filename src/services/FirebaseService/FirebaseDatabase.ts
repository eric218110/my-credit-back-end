import { config } from "dotenv";
import * as firebaseAdmin from "firebase-admin";
import { MyFirebaseApplication } from "./Firebase";

class FirebaseDatabase {
  async saveUser(email: string, password: string, id: string) {
    const databaseFirebase = MyFirebaseApplication.getInstance().database();
    const refDatabase = databaseFirebase.ref(
      MyFirebaseApplication.getRefDatabase()
    );
    await refDatabase
      .push()
      .set({
        id,
        email,
        password,
      })
      .catch(() => console.log(`User not create`));
  }
}

export const firebaseDatabase = new FirebaseDatabase();
