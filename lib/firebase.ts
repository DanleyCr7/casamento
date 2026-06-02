"use client";

import { getAnalytics, isSupported } from "firebase/analytics";
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdEeaG_edIyOvre3Np2d0e95RI81o6xyk",
  authDomain: "customiza-5c81b.firebaseapp.com",
  projectId: "customiza-5c81b",
  storageBucket: "customiza-5c81b.firebasestorage.app",
  messagingSenderId: "94694107649",
  appId: "1:94694107649:web:b9c84f6e830749fbc82e00",
  measurementId: "G-H6YQR1WRN5",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (typeof window !== "undefined") {
  void isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}
