import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from 'firebase/auth';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo)
    }

    const updateUserToken = (token) => {
        setUser(prev => ({
            ...prev,
            accessToken: token,
        }));
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                try {
                    const token = localStorage.getItem('accessToken');
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`);
                    const userFromDB = res.data;
                    console.log(userFromDB);
                    if (res.data) {
                        setUser({
                            ...userFromDB,
                            accessToken: token,
                        }); // ✅ Now user has email, name, role, badge, etc.
                        console.log('User with role from DB:', res.data);
                    } else {
                        // fallback, still set Firebase user
                        setUser(currentUser);
                        console.log('Fallback to Firebase user only:', currentUser);
                    }
                } catch (err) {
                    console.error('Error fetching user from DB:', err);
                    setUser(currentUser); // fallback
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);



    const authInfo = {
        user,
        loading,
        setLoading,
        setUser,
        createUser,
        signInUser,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        updateUserToken
    }
    return <div>
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    </div>;
};

export default AuthProvider;