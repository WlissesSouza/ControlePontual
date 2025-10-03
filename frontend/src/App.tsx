import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './layouts/Base';
import Home from './page/Home';
import Login from './page/Login';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Saudacao from './page/Saudacao';


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rota pública para a página de login */}

                    <Route element={<Base />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* PrivateRoute criar uma Rota de páginas protegidas */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/saudacao" element={<Saudacao />} />
                    </Route>


                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;