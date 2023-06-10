// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { BsInfoLg } from 'react-icons/bs';
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
            {/* Titulo, Fecha de creacion y actualizacion */}
            <div className="flex justify-between items-center">
                {/* Nombre e informacion del proyecto */}
                {/* Nombre del Proyecto a Editar */}
                <h1 className="flex flex-col text-gray-300 text-3xl sm:text-4xl md:text-5xl font-black">
                    <span className="text-sky-500">Editar Proyecto:</span>{' '}
                    {nombre}
                </h1>

                {/* Acciones del Proyecto */}
                <div className="flex items-center gap-4">
                    <Link
                        className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                        to={`/proyectos/${id}`}
                    >
                        <BsInfoLg fontSize={25} />
                    </Link>

                    <Link className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1">
                        <FiTrash2 fontSize={25} />
                    </Link>
                </div>
            </div>

            {/* Formulario de edicion */}
            <div className="mt-10 flex justify-center mb-14">
                <FormularioProyecto />
            </div>
        </>
    );
}
// ---- ---- ---- ---- ---- ---- //
