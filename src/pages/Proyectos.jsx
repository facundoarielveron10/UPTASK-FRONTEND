// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTOS) ---- //
export default function Proyectos() {
	// ---- CONTEXTs ---- //
	const { proyectos } = useProyectos();
	// ---- ---- ---- ---- //

	return (
		<div>
			<h1 className="text-4xl font-black text-gray-500">Proyectos</h1>
		</div>
	);
}
// ---- ---- ---- ---- ---- ---- //
