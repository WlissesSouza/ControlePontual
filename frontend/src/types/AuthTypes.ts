export interface UserData {
    username: string;
    first_name: string;
    email?: string
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: UserData | null;
    login: (accessToken: string, refreshToken: string, userData: UserData) => void;
    logout: () => void;
}