// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import { formatearFecha } from '../helpers/utilities';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
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
                    {/* Nombre e informacion del proyecto */}
                    <h1 className="flex flex-col text-gray-300 text-4xl sm:text-5xl md:text-6xl font-black">
                        {nombre}
                        <span className="opacity-70 text-xs mt-2 md:text-sm text-gray-400 font-black">
                            Creado {formatearFecha(createdAt)}
                        </span>
                        <span className="opacity-70 text-xs flex flex-col md:text-sm text-gray-400 font-black">
                            Actualizado {formatearFecha(updatedAt)}
                        </span>
                    </h1>
                    {/* Acciones del Proyecto */}
                    <div className="flex items-center gap-4">
                        <Link
                            className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                            to={`/proyectos/editar/${id}`}
                        >
                            <FiEdit2 fontSize={25} />
                        </Link>

                        <Link className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1">
                            <FiTrash2 fontSize={25} />
                        </Link>
                    </div>
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
