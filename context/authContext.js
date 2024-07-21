import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub;
    }, [])

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({
                ...user,
                username: data.username,
                profileUrl: data.profileUrl,
                userId: data.userId,
            })
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return {success: true}
        } catch (error) {
            let msg = error.message
            if (msg.includes('(auth/invalid-email)')){
                msg = 'Invalid email'
            }
            if (msg.includes('(auth/invalid-login-credentials)')){
                msg = 'Wrong credentials'
            }
            return { success: false, msg }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            return {success: true}
        } catch (error) {
            return {success: false, msg: error.message, error: error}
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log('response.user :', response?.user)
            // setUser(response?.user)
            // setIsAuthenticated(true)
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid,
            })
            return { success: true, data: response?.user }
        } catch (error) {
            let msg = error.message
            if (msg.includes('(auth/invalid-email)')){
                msg = 'Invalid email'
            }
            if (msg.includes('(auth/email-already-in-use)')){
                msg = 'Email already in use'
            }
            if (msg.includes('(auth/weak-password)')){
                msg = 'Password should be at least 6 characters long'
            }
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider')
    }

    return value;
}