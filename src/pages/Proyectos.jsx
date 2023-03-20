// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTOS) ---- //
export default function Proyectos() {
	// ---- CONTEXTs ---- //
	const { proyectos } = useProyectos();
	// ---- ---- ---- ---- //

	console.log(proyectos);

	return (
		<div>
			<h1 className="text-4xl font-black text-gray-500">Proyectos</h1>
		</div>
	);
}
// ---- ---- ---- ---- ---- ---- //
