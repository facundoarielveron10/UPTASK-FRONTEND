// ---- IMPORTACIONES ---- //
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (HEADER) ---- //
export default function Header() {
	// ---- DATOS ---- //
	const { auth } = useAuth();
	// ---- ----- ---- //

	return (
		<header className="px-4 py-5 bg-[#111111] border-b border-b-[#0e0d0d]">
			<div className="md:flex md:justify-between">
				<h2 className="text-4xl text-sky-600 font-black text-center">
					UpTask
				</h2>

				<input
					type="search"
					placeholder="Buscar Proyecto"
					className="rounded-lg lg:w-96 block p-2 border bg-gray-800 border-gray-600"
				/>

				<div className="flex gap-5 justify-center items-center">
					<Link
						to="/proyectos"
						className="font-bold uppercase text-gray-100"
					>
						Proyectos
					</Link>
				</div>
			</div>
		</header>
	);
}
// ---- ---- ---- ---- ---- ---- //
