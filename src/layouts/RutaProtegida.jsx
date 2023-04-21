// ---- IMPORTACIONES ---- //
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Spinner from '../components/Spinner';
// ---- ---- ---- ---- ---- //

// ---- LAYOUT (RUTA PROTEGIDA) ---- //
export default function RutaProtegida() {
    // ---- CONTEXT ---- //
    const { auth, cargando } = useAuth();
    // ---- ---- ---- ---- //

    return cargando ? (
        <Spinner />
    ) : (
        <>
            {auth._id ? (
                <>
                    <Header />

                    <main className="p-5 md:p-10">
                        <Outlet />
                    </main>

                    <div className="fixed w-full bottom-0">
                        <Menu />
                    </div>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}
// ---- ---- ---- ---- ---- ---- ---- //
