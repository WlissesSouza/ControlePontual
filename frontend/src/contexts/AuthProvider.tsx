import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType, UserData } from '../types/AuthTypes';


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // 1. Estados iniciais
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);

    // Adicionamos um estado para controlar se o provedor está carregando os dados do usuário
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // 2. O `useEffect` que resolve o problema do F5
    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        const userData = localStorage.getItem('user');

        if (accessToken && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        } else {
            // Se não estiver autenticado, limpa os tokens
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
        }

        setIsCheckingAuth(false);
    }, []);

    const login = (accessToken: string, refreshToken: string, userData: UserData) => {
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);

        // encerra o loading
        setIsCheckingAuth(false);
    };

    const logout = useCallback(() => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = '/';
    }, []);


    // 3. Renderiza um estado de "loading" se a autenticação estiver sendo verificada
    if (isCheckingAuth) {
        return <div>Carregando...</div>;
    }

    const contextValue: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;