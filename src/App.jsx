// ---- IMPORTACIONES ---- //
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (APLICACION PRINCIPAL) ---- //
function App() {
    return (
        <BrowserRouter>
            {/* RUTAS */}
            <Routes>
                {/* AREA PUBLICA */}
                <Route path="/" element={<AuthLayout />}>
                    {/* INICIO DE SESION */}
                    <Route index element={<Login />} />
                    {/* REGISTRARSE */}
                    <Route path="registrar" element={<Registrar />} />
                    {/* OLVIDE MI PASSWORD */}
                    <Route
                        path="olvide-password"
                        element={<OlvidePassword />}
                    />
                    {/* REESTABLECER PASSWORD */}
                    <Route
                        path="olvide-password/:token"
                        element={<NuevoPassword />}
                    />
                    {/* CONFIRMAR CUENTA */}
                    <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
// ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default App;
// ---- ---- ---- ---- ---- //
