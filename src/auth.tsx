import {
   getAuth,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   type User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import firebaseApp from './firebase';
import { redirect, type ActionFunctionArgs } from 'react-router';

const auth = getAuth(firebaseApp);

export async function register({ request }: ActionFunctionArgs) {
   const fd = await request.formData();

   try {
      const email = fd.get('email') as string;
      const pass = fd.get('password') as string;
      if (email && pass) {
         const oUC = await createUserWithEmailAndPassword(auth, email, pass);
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

export function setStateChangeHandler(func: (__user: User) => void) {
   return onAuthStateChanged(auth, func);
}

export async function login({ request }: ActionFunctionArgs) {
   const fd = await request.formData();

   try {
      const email = fd.get('email') as string;
      const pass = fd.get('password') as string;
      if (email && pass) {
         await signInWithEmailAndPassword(auth, email, pass);
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

export async function logout() {
   await signOut(auth);
   return redirect('/login');
}
