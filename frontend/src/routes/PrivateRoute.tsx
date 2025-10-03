import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC = () => {
    // Usa o hook personalizado para verificar o estado de autenticação
    const { isAuthenticated } = useAuth();

    // Usa o useLocation para obter a URL atual (onde o usuário está tentando ir)
    const location = useLocation();

    // Se o usuário não estiver autenticado, redireciona para a página de login
    // e passa o 'state' com a URL de origem.
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se estiver autenticado, renderiza as rotas filhas
    return <Outlet />;
};

export default PrivateRoute;