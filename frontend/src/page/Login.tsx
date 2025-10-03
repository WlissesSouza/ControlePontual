// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import apiService from '../services/apiService';

const Login: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const { access, refresh, user } = await apiService.post('token/', { username, password });
            login(access, refresh, user);
            navigate(from, { replace: true });

        } catch {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        // Por enquanto está sem layout para teste de login de backend, em proximos commit irei atualizar
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
            <button type="submit">Entrar</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default Login;