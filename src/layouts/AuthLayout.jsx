// ---- IMPORTACIONES ---- //
import { Outlet } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (AUTENTICACION LAYOUT) ---- //
export default function AuthLayout() {
	return (
		<>
			<main className="container h-screen mx-auto p-5 flex items-center justify-center">
				<div className="md:w-2/3 lg:w-2/5">
					<Outlet />
				</div>
			</main>
		</>
	);
}
// ---- ---- ---- ---- ---- //
