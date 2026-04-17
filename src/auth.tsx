import {
   getAuth,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   type User,
   type AuthError,
   type UserCredential,
   type Unsubscribe,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import firebaseApp from './firebase';
import { redirect, type ActionFunctionArgs } from 'react-router';

export const auth = getAuth(firebaseApp);

export function getUserId(): string | null {
   if (auth.currentUser) {
      return auth.currentUser?.uid;
   } else return window.localStorage.getItem('user-id');
}

export async function register({
   request,
}: ActionFunctionArgs): Promise<string | Response | undefined> {
   if (getUserId()) return redirect('/');

   const fd = await request.formData();

   try {
      const email = fd.get('email') as string;
      const pass = fd.get('password') as string;
      if (email && pass) {
         await createUserWithEmailAndPassword(auth, email, pass)
            .then((uc: UserCredential) => {
               window.localStorage.setItem('user-id', uc.user.uid);
            })
            .catch((error: AuthError) => {
               console.log(`${error.code} ${error.message}`);
            });
      }
      return redirect('/');
   } catch (error) {
      if (error instanceof FirebaseError) {
         return error.code;
      } else {
         // Handle cases where something else was thrown (e.g., a string)
         console.log('An unexpected error occurred', error);
      }
   }
}

export function setStateChangeHandler({ func }: { func: (__user: User) => void }): Unsubscribe {
   return onAuthStateChanged(auth, func);
}

export async function login({
   request,
}: ActionFunctionArgs): Promise<string | Response | undefined> {
   if (getUserId()) return redirect('/');

   const fd = await request.formData();

   try {
      const email = fd.get('email') as string;
      const pass = fd.get('password') as string;
      if (email && pass) {
         await signInWithEmailAndPassword(auth, email, pass)
            .then((uc: UserCredential) => {
               window.localStorage.setItem('user-id', uc.user.uid);
            })
            .catch((error: AuthError) => {
               console.log(`${error.code} ${error.message}`);
            });
      }
      return redirect('/');
   } catch (error) {
      if (error instanceof FirebaseError) {
         return error.code;
      } else {
         // Handle cases where something else was thrown (e.g., a string)
         console.log('An unexpected error occurred', error);
      }
   }
}

export async function logout(): Promise<Response> {
   await signOut(auth);
   window.localStorage.removeItem('user-id');
   return redirect('/login');
}
