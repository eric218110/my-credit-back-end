import { MyFirebaseApplication } from "./Firebase";
import { auth, FirebaseError } from "firebase-admin/lib";

class FirebaseAuth {
  getUserByEmail(email: string) {
    const firebaseAuth = MyFirebaseApplication.getInstance().auth();

    firebaseAuth
      .getUserByEmail(email)
      .then((userRecord) => console.log(userRecord))
      .catch((error) => console.log(error));
  }

  saveUser(User: {
    email: string;
    displayName: string;
    password: string;
  }): Promise<boolean | string> {
    const firebaseAuth = MyFirebaseApplication.getInstance().auth();
    const { email, displayName, password } = User;

    const user = firebaseAuth
      .createUser({
        email,
        displayName,
        password,
      })
      .then((userRecord) => userRecord.uid)
      .catch((error: FirebaseError) => {
        console.log(error.message);
        return false;
      });

    return user;
  }
}

export const firebaseAuth = new FirebaseAuth();
