// ---- IMPORTACIONES ---- //
import { Outlet } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (AUTENTICACION LAYOUT) ---- //
export default function AuthLayout() {
    return (
        <>
            <div>Auth Layout</div>

            <Outlet />
        </>
    );
}
// ---- ---- ---- ---- ---- //
