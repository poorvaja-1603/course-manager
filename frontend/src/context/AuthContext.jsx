import {createContext, useState, useEffect} from 'react';

export const AuthContext= createContext({
    role: null,
    isLoggedIn: false,
    userId: null,
    login:()=>{},
    logout:()=>{}
})

export const AuthProvider=(props)=>{
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[role, setRole] = useState(null);
    const[userId, setUserId] = useState(null);

    useEffect(()=>{
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if(storedAuth){
        setIsLoggedIn(storedAuth.isLoggedIn);
        setRole(storedAuth.role);
        setUserId(storedAuth.userId);
    }},[])

    const login=(id,userRole)=>{
        setIsLoggedIn(true);
        setRole(userRole);
        setUserId(id)
        localStorage.setItem('auth', JSON.stringify({isLoggedIn: true, userId:id ,role: userRole}))
    }

    const logout=()=>{
        setIsLoggedIn(false);
        setRole(null);
        setUserId(null);
        localStorage.removeItem('auth');
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, role, userId ,login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}