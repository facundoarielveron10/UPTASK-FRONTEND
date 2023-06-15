// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { formatearFecha } from '../helpers/utilities';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { TbSubtask } from 'react-icons/tb';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ModalTarea from '../components/ModalTarea';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTO) ---- //
export default function Proyecto() {
    // ---- CONTEXTs ---- //
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
        useProyectos();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [modal, setModal] = useState(false);
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

    // ---- SWEET ALERTA ---- //
    const MySwal = withReactContent(Swal);
    // ---- ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleDelete = async () => {
        await MySwal.fire({
            title: '¿ESTAS SEGURO?',
            text: 'ESTAS A PUNTO DE ELIMINAR UN PROYECTO!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, ELIMINAR!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'ELIMINADO!',
                    'PROYECTO ELIMINADO CORRECTAMENTE',
                    'success'
                ).then(async (result) => {
                    await eliminarProyecto(id);
                    if (result.isConfirmed) {
                        window.location.assign('/proyectos');
                    }
                });
            }
        });
    };
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
                    <div className="sm:flex items-center gap-4 hidden">
                        <Link
                            className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                            to={`/proyectos/editar/${id}`}
                        >
                            <FiEdit2 fontSize={25} />
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                        >
                            <FiTrash2 fontSize={25} />
                        </button>
                    </div>
                </div>
                {/* Cliente del Proyecto */}
                <h2 className="text-sky-600 text-xl sm:text-2xl md:text-3xl font-black">
                    {cliente}
                </h2>

                {/* Acciones del Proyecto */}
                <div className="sm:hidden items-center gap-4 flex mt-4">
                    <Link
                        className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                        to={`/proyectos/editar/${id}`}
                    >
                        <FiEdit2 fontSize={25} />
                    </Link>

                    <button className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1">
                        <FiTrash2 fontSize={25} />
                    </button>
                </div>

                {/* Agregar Tareas */}
                <button
                    className="flex justify-center items-center text-sm px-5 py-3 w-full sm:w-auto rounded-lg uppercase font-black bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white text-center mt-5"
                    type="button"
                    onClick={() => setModal(true)}
                >
                    <TbSubtask fontSize={20} />
                    Agregar Tarea
                </button>
            </div>
            {/* Descripcion y Jerarquias */}
            <div className="p-5 sm:p-7 md:p-10">
                {/* Descripcion */}
                <h2 className="text-gray-200 font-black uppercase text-lg">
                    Descripcion del Proyecto
                </h2>
                <p className="text-gray-300 font-bold py-5">{descripcion}</p>
            </div>

            {/* Modal de Tareas */}
            <ModalTarea modal={modal} setModal={setModal} />
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
