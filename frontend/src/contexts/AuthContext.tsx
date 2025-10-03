import { createContext } from 'react';
import type { AuthContextType } from '../types/AuthTypes';

// Exporta apenas a criação do contexto.
// A interface AuthContextType é importada para tipagem.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);