// ---- IMPORTACIONES ---- //
import FormularioProyecto from '../components/FormularioProyecto';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (CREAR PROYECTO) ---- //
export default function NuevoProyecto() {
	return (
		<div>
			<h1 className="text-4xl font-black text-gray-500">
				Crear Proyecto
			</h1>

			<div className="mt-10 flex justify-center">
				<FormularioProyecto />
			</div>
		</div>
	);
}
// ---- ---- ---- ---- ---- ---- //
