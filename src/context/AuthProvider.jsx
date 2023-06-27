// ---- IMPORTACIONES ---- //
import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
// ---- ---- ---- ---- ---- //

// ---- CONTEXTS (AUTENTICACION) ---- //
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // ---- ESTADOS ---- //
    const [auth, setAuth] = useState({});
    const [alerta, setAlerta] = useState({ msg: '', error: false });
    const [cargando, setCargando] = useState(true);
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        // AUTENTICAMOS AL USUARIO
        const autenticarUsuario = async () => {
            // Verificamos que el token exista
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return;
            }

            // Configuramos el llamado a la API
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            // Enviamos la peticion a la API
            try {
                const { data } = await clienteAxios('usuarios/perfil', config);
                setAuth(data);
            } catch (error) {
                setAuth({});
            }

            setCargando(false);
        };

        return () => {
            autenticarUsuario();
        };
    }, []);
    // ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const mostrarAlerta = (alerta) => {
        setAlerta(alerta);
    };

    const cerrarSesionAuth = () => {
        setAuth({});
        setAlerta({});
    };
    // ---- ---- ---- ---- //

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                mostrarAlerta,
                alerta,
                setAlerta,
                cargando,
                cerrarSesionAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
// ---- ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export { AuthProvider };
export default AuthContext;
// ---- ---- ---- ---- ---- //
