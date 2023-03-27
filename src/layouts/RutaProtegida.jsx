// ---- IMPORTACIONES ---- //
import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Hamburger from 'hamburger-react';
import Menu from '../components/Menu';
// ---- ---- ---- ---- ---- //

// ---- LAYOUT (RUTA PROTEGIDA) ---- //
export default function RutaProtegida() {
    // ---- PATHNAME ---- //
    const { pathname } = useLocation();
    // ---- ---- ---- ---- //

    // ---- CONTEXT ---- //
    const { auth, cargando } = useAuth();
    const [menu, setMenu] = useState(false);
    // ---- ---- ---- ---- //
    if (cargando) return 'Cargando...';

    return (
        <>
            {auth._id ? (
                <>
                    <Header />

                    <main className="p-5 md:p-10">
                        <Outlet />
                    </main>

                    <div className="flex justify-center my-4">
                        <div className="text-sky-600 bg-[#090909] rounded-full p-2 border-[3px] border-sky-600 hover:border-teal-500 hover:text-teal-500 transition-all duration-300">
                            <Hamburger toggled={menu} toggle={setMenu} />
                        </div>
                    </div>

                    {menu && <Menu pathname={pathname} />}
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}
// ---- ---- ---- ---- ---- ---- ---- //
