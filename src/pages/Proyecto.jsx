// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { formatearFecha } from '../helpers/utilities';
import Spinner from '../components/Spinner';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTO) ---- //
export default function Proyecto() {
	// ---- CONTEXTs ---- //
	const { obtenerProyecto, proyecto, cargando } = useProyectos();
	// ---- ---- ---- ---- //

	// ---- ID ---- //
	const { id } = useParams();
	// ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		return () => {
			obtenerProyecto(id);
		};
	}, []);
	// ---- ---- ---- ---- //

	// ---- DATOS ---- //
	const {
		cliente,
		colaboradores,
		creador,
		createdAt,
		descripcion,
		fechaEntrega,
		nombre,
		updatedAt,
	} = proyecto;
	// ---- ---- ---- //

	return cargando ? (
		<Spinner />
	) : (
		<div className="select-none">
			{/* Nombre y Cliente */}
			<div className="p-5 sm:p-7 md:p-10">
				{/* Titulo, Fecha de creacion y actualizacion */}
				<div className="flex justify-between items-center">
					<h1 className="flex flex-col text-gray-300 text-4xl sm:text-5xl md:text-6xl font-black">
						{nombre}
						<span className="text-xs md:text-sm text-gray-400 font-black">
							Creado {formatearFecha(createdAt)}
						</span>
						<span className="flex flex-col xl:hidden text-xs md:text-sm text-gray-400 font-black">
							Actualizado {formatearFecha(updatedAt)}
						</span>
					</h1>

					<p className="hidden xl:flex text-sm text-gray-400 font-black">
						Actualizado {formatearFecha(updatedAt)}
					</p>
				</div>

				<h2 className="text-sky-600 text-xl sm:text-2xl md:text-3xl font-black">
					{cliente}
				</h2>
			</div>
			{/* Descripcion y Jerarquias */}
			<div className="p-5 sm:p-7 md:p-10">
				{/* Descripcion */}
				<h2 className="text-gray-200 font-black uppercase text-lg">
					Descripcion del Proyecto
				</h2>
				<p className="text-gray-300 font-bold py-5">{descripcion}</p>
			</div>
		</div>
	);
}
// ---- ---- ---- ---- ---- ---- //
