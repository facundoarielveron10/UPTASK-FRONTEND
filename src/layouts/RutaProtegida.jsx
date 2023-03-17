// ---- IMPORTACIONES ---- //
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
// ---- ---- ---- ---- ---- //

// ---- LAYOUT (RUTA PROTEGIDA) ---- //
export default function RutaProtegida() {
	// ---- CONTEXT ---- //
	const { auth, cargando } = useAuth();
	// ---- ---- ---- ---- //
	if (cargando) return 'Cargando...';
	return (
		<>
			{auth._id ? (
				<div>
					<Header />

					<div className="md:flex md:min-h-screen">
						<Sidebar />

						<main className="ml-28 p-10 flex-1">
							<Outlet />
						</main>
					</div>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
}
// ---- ---- ---- ---- ---- ---- ---- //
