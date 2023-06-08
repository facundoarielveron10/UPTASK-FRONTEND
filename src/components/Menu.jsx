// ---- IMPORTACIONES ---- //
import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (Menu) ---- //
export default function Menu() {
	// ---- ESTADOS ---- //
	const [menu, setMenu] = useState(false);
	// ---- ---- ---- ---- //

	// ---- CONTEXTs ---- //
	const { proyectos } = useProyectos();
	// ---- ---- ---- ---- //

	return (
		<>
			{/* Boton Hamburguesa */}
			<div className="flex justify-center my-4">
				<div className="text-sky-600 bg-[#090909] rounded-full p-2 border-[3px] border-sky-600 hover:border-teal-500 hover:text-teal-500 transition-all duration-300">
					<Hamburger toggled={menu} toggle={setMenu} />
				</div>
			</div>

			{/* Menu */}
			{menu && (
				<div
					className={`bg-[#090909] border-t-[3px] border-l-[3px] border-r-[3px] border-sky-500 pt-4 hover:border-teal-500 transition-all duration-300 w-10/12 sm:w-1/2 lg:w-1/4 m-auto`}
				>
					{/* Menu */}
					<div className="flex flex-col items-center justify-center">
						{/* Enlace (Crear Proyecto) */}
						<Link
							className="flex items-center font-bold uppercase my-4 text-sky-500 hover:text-teal-500 transition-colors duration-300"
							to="crear-proyecto"
						>
							Crear Proyecto
						</Link>
						{/* Enlace (Editar Proyecto) */}
						<Link
							className="flex items-center font-bold uppercase my-4 text-sky-500 hover:text-teal-500 transition-colors duration-300"
							to="crear-proyecto"
						>
							Editar Proyecto
						</Link>
						{/* Enlace (Configuracion) */}
						<Link
							className="flex items-center font-bold uppercase my-4 text-sky-500 hover:text-teal-500 transition-colors duration-300"
							to="crear-proyecto"
						>
							Configuracion
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
// ---- ---- ---- ---- ---- ---- //
