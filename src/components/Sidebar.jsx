// ---- IMPORTACIONES ---- //
import { FaProjectDiagram } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (SIDEBAR) ---- //
export default function Sidebar() {
	return (
		<aside className="h-screen fixed flex justify-start items-center">
			{/* Sidebar */}
			<div className="ml-6 flex w-16 flex-col items-center space-y-10 py-6">
				{/* Icono Seccion */}
				<div className="flex items-center justify-center rounded-md bg-[#101010] border-[2px] border-sky-600 hover:border-teal-500 transition-colors duration-300 p-4 text-sky-600 hover:text-teal-500 ">
					<FaProjectDiagram fontSize={40} />
				</div>
				{/* Enlaces */}
				<div className="space-y-48 rounded-md bg-[#101010] border-[2px] border-sky-600 hover:border-teal-500 transition-colors duration-300">
					{/* Contenedor de enlaces */}
					<ul>
						{/* Crear Proyectos */}
						<li className="p-5">
							<Link
								className="text-sky-600 hover:text-teal-500 transition-colors duration-300"
								to="crear-proyecto"
							>
								<IoMdCreate fontSize={35} />
							</Link>
						</li>
						{/* Cuenta */}
						<li className="p-5">
							<Link
								className="text-sky-600 hover:text-teal-500 transition-colors duration-300"
								to="#"
							>
								<RiAccountCircleLine fontSize={35} />
							</Link>
						</li>
					</ul>
					{/* Cerrar Sesion */}
					<div className="flex items-center justify-center pb-5">
						<button
							className="text-sky-600 hover:text-teal-500 transition-colors duration-300"
							type="button"
						>
							<FiLogOut fontSize={35} />
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
// ---- ---- ---- ---- ---- ---- //
