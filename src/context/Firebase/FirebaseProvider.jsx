import React, { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import FirebaseContext from "./FirebaseContext";

const auth = getAuth(firebaseApp);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // console.log('mongo user : ', mongoUser)

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/api/users/${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => setMongoUser(data))
        .catch((err) => setMongoUser(null));
    } else {
      setMongoUser(null);
    }
  }, [user]);

  const signUpWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      setError(error.message);
      console.error("Error in Google Sign in:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("User signed up:", user);
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("User signed in:", user);
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    mongoUser,
    loading,
    error,
    signUpWithGoogle,
    signOut,
    signinUserWithEmailAndPassword,
    signupUserWithEmailAndPassword,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
