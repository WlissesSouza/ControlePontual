import React from "react";
import { useAuth } from "../hooks/useAuth";


const Saudacao: React.FC = () => {
    const { user, isAuthenticated } = useAuth()

    const renderName = () => {
        if (!isAuthenticated) {
            return "Visitante";
        }
        // Caso o usuário esteja autenticado, retorna o nome de usuário
        return user?.first_name || user?.username || "Usuario";
    };

    //Iniciei de forma simples para realizar teste de retorno de usuario do backend, mas irei alterar em proximos commits
    return (
        <div className="d-flex ">
            <h4>Seja bem vindo {renderName()}!</h4>
        </div>
    );
}
export default Saudacao