import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB23UqxXKWVnvWd_MvrGGnRNdbk2Lg3eyc",
    authDomain: "react-native-chat-dd3c5.firebaseapp.com",
    projectId: "react-native-chat-dd3c5",
    storageBucket: "react-native-chat-dd3c5.appspot.com",
    messagingSenderId: "369320947348",
    appId: "1:369320947348:web:19212b5dedb83ca58b8e81"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db, 'users')
export const roomsRef = collection(db, 'rooms')