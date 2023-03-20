// ---- IMPORTACIONES ---- //
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Menu from '../components/Menu';
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
				<div className="mb-36">
					<Header />

					<main className="p-5 md:p-10">
						<Outlet />
					</main>

					<div className="flex justify-center md:mt-7">
						<Menu />
					</div>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
}
// ---- ---- ---- ---- ---- ---- ---- //
