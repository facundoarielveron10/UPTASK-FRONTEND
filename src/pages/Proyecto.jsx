// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTO) ---- //
export default function Proyecto() {
	// ---- CONTEXTs ---- //
	const { obtenerProyecto, proyecto } = useProyectos();
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
		descripcion,
		fechaEntrega,
		nombre,
		updatedAt,
		createdAt,
		colaboradores,
	} = proyecto;
	// ---- ----- ---- //
	return proyecto ? (
		<div>
			{/* Nombre y Cliente */}
			<div className="p-5 sm:p-7 md:p-10">
				<h1 className="text-gray-300 text-4xl sm:text-5xl md:text-6xl font-black">
					{nombre}
				</h1>
				<h2 className="mt-2 text-gray-400 text-xl sm:text-2xl md:text-3xl font-bold">
					{cliente}
				</h2>
			</div>
			{/* Informacion */}
		</div>
	) : null;
}
// ---- ---- ---- ---- ---- ---- //
