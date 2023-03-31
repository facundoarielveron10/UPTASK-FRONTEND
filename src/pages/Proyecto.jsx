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
	return <div>Hola: </div>;
}
// ---- ---- ---- ---- ---- ---- //
