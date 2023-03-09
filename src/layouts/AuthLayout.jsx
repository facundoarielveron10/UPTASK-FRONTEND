// ---- IMPORTACIONES ---- //
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (AUTENTICACION LAYOUT) ---- //
export default function AuthLayout() {
	// ---- URL ---- //
	const { pathname } = useLocation();
	// ---- ---- ---- //
	return (
		<>
			<main
				className={`container ${
					pathname.toString() === '/registrar' ? 'h-full' : 'h-screen'
				} mx-auto p-5 flex items-center justify-center`}
			>
				<div className="md:w-2/3 lg:w-2/5">
					<Outlet />
				</div>
			</main>
		</>
	);
}
// ---- ---- ---- ---- ---- //
