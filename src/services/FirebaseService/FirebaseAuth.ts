import { MyFirebaseApplication } from "./Firebase";
import { auth, FirebaseError } from "firebase-admin/lib";

class FirebaseAuth {
  getUserByEmail(email: string) {
    const firebaseAuth = MyFirebaseApplication.getInstance().auth();

    firebaseAuth
      .getUserByEmail(email)
      .then((userRecord) => userRecord.providerData)
      .catch((error) => console.log(error));
  }

  saveUser(User: {
    email: string;
    displayName: string;
    password: string;
    photoURL: string;
  }): Promise<boolean | string> {
    const firebaseAuth = MyFirebaseApplication.getInstance().auth();
    const { email, displayName, password, photoURL } = User;

    const user = firebaseAuth
      .createUser({
        email,
        displayName,
        password,
        photoURL,
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
