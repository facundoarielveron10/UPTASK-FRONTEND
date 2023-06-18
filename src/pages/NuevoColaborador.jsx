// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import FormularioColaborador from '../components/FormularioColaborador';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (NUEVO COLABORADOR) ---- //
export default function NuevoColaborador() {
    // ---- CONTEXTs ---- //
    const { obtenerProyecto, proyecto, cargando } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- ID ---- //
    const { id } = useParams();
    // ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        obtenerProyecto(id);
    }, []);

    // ---- ---- ---- ---- //

    return cargando ? (
        <Spinner />
    ) : (
        <>
            {/* Titulo */}
            <h1 className="text-4xl font-black text-gray-500">
                Añadir Colaborador(a):
            </h1>
            <h2 className="text-sky-500 hover:text-teal-500 transition-colors duration-300 font-black text-4xl">
                {proyecto.nombre}
            </h2>
            {/* Formulario para añadir colaborador */}
            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>
        </>
    );
}
// ---- ---- ---- ---- ---- ---- ---- //
