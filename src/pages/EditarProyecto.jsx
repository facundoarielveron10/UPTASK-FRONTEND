// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Spinner from '../components/Spinner';
import FormularioProyecto from '../components/FormularioProyecto';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (EDITAR PROYECTO) ---- //
export default function EditarProyecto() {
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
	const { nombre } = proyecto;
	// ---- ---- ---- //

	return cargando ? (
		<Spinner />
	) : (
		<>
			{/* Nombre del Proyecto a Editar */}
			<h1 className="flex flex-col text-gray-300 text-3xl sm:text-4xl md:text-5xl font-black">
				<span className="text-sky-500">Editar Proyecto:</span> {nombre}
			</h1>

			{/* Formulario de edicion */}
			<div className="mt-10 flex justify-center mb-14">
				<FormularioProyecto />
			</div>
		</>
	);
}
// ---- ---- ---- ---- ---- ---- //
