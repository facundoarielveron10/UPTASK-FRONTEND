// ---- IMPORTACIONES ---- //
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// ---- ---- ---- ---- ---- //

// ---- LAYOUT (RUTA PROTEGIDA) ---- //
export default function RutaProtegida() {
	// ---- CONTEXT ---- //
	const { auth, cargando } = useAuth();
	// ---- ---- ---- ---- //
	if (cargando) return 'Cargando...';
	return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
}
// ---- ---- ---- ---- ---- ---- ---- //
