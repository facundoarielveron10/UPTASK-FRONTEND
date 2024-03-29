// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import {
    formatearFechaHora,
    formatearFecha,
    compararFecha,
} from '../helpers/utilities';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { TbSubtask } from 'react-icons/tb';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPersonPlusFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Typewriter } from 'react-simple-typewriter';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ModalTarea from '../components/ModalTarea';
import ModalUsuario from '../components/ModalUsuario';
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- SOCKET IO ---- //
let socket;
// ---- ---- ---- ---- //

// ---- PAGINA (PROYECTO) ---- //
export default function Proyecto() {
    // ---- CONTEXTs ---- //
    const {
        obtenerProyecto,
        proyecto,
        cargando,
        handleDeleteProyecto,
        handleModalTarea,
        alerta,
        error,
        editarProyectoProyectos,
        submitTareasProyectos,
        eliminarTareaProyecto,
        editarTareaProyecto,
        completarTareaProyecto,
        submitColaboradoresProyectos,
        eliminarColaboradorProyectos,
        editandoProyecto,
        editando,
    } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [modalUsuario, setModalUsuario] = useState(false);
    // ---- ---- ---- ---- //

    // ---- ID ---- //
    const { id } = useParams();
    // ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        obtenerProyecto(id);
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACK_URL);
        socket.emit('abrir proyecto', id);
    }, []);

    useEffect(() => {
        socket.on('proyecto editado', (proyectoEditado) => {
            if (proyectoEditado?._id === proyecto?._id) {
                editarProyectoProyectos(proyectoEditado);
            }
        });

        socket.on('editando', (estado, proyectoEditar) => {
            if (proyectoEditar === proyecto?._id) {
                editandoProyecto(estado);
            }
        });

        socket.on('informacion', (estado, proyectoEditar) => {
            if (proyectoEditar === proyecto?._id) {
                editandoProyecto(estado);
            }
        });

        socket.on('tarea agregada', (tareaNueva) => {
            if (tareaNueva?.proyecto === proyecto?._id) {
                submitTareasProyectos(tareaNueva);
            }
        });

        socket.on('tarea eliminada', (tareaEliminada) => {
            if (tareaEliminada?.proyecto === proyecto?._id) {
                eliminarTareaProyecto(tareaEliminada);
            }
        });

        socket.on('tarea editada', (tareaEditada) => {
            if (tareaEditada?.proyecto?._id === proyecto?._id) {
                editarTareaProyecto(tareaEditada);
            }
        });

        socket.on('nuevo estado', (nuevoEstado) => {
            if (nuevoEstado?.proyecto?._id === proyecto?._id) {
                completarTareaProyecto(nuevoEstado);
            }
        });

        socket.on(
            'nuevo colaborador',
            (nuevoColaborador, proyectoColaborador) => {
                if (proyectoColaborador === proyecto?._id) {
                    submitColaboradoresProyectos(nuevoColaborador);
                }
            }
        );

        socket.on(
            'colaborador eliminado',
            (colaboradorEliminado, proyectoColaborador) => {
                if (proyectoColaborador === proyecto?._id) {
                    eliminarColaboradorProyectos(colaboradorEliminado);
                }
            }
        );
    });
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
    const admin = useAdmin();
    // ---- ---- ---- //

    return cargando ? (
        <Spinner />
    ) : (
        <div className="select-none">
            {alerta.error && error ? (
                <Alerta alerta={alerta} />
            ) : (
                <>
                    {/* Fecha de Entrega del Proyecto */}
                    <p className="text-gray-300 font-black text-sm uppercase">
                        Fecha de entrega:{' '}
                        <span className="text-sky-500">
                            {formatearFecha(fechaEntrega)}
                        </span>{' '}
                        {compararFecha(fechaEntrega) == 1 && (
                            <span className="block text-green-500">
                                (A tiempo de entrega)
                            </span>
                        )}
                        {compararFecha(fechaEntrega) == 2 && (
                            <span className="block text-red-500">
                                (No queda mas tiempo)
                            </span>
                        )}
                        {compararFecha(fechaEntrega) == 3 && (
                            <span className="block text-orange-500">
                                (Se entrega hoy)
                            </span>
                        )}
                    </p>
                    {/* Nombre y Cliente */}
                    <div className="p-5 sm:p-7 md:p-10">
                        {/* Titulo, Fecha de creacion y actualizacion */}
                        <div className="flex justify-between items-center">
                            {/* Nombre e informacion del proyecto */}
                            <h1 className="flex flex-col text-gray-300 text-4xl sm:text-5xl md:text-6xl font-black">
                                {nombre}
                                <span className="opacity-70 text-xs mt-2 md:text-sm text-gray-400 font-black">
                                    Creado {formatearFechaHora(createdAt)}
                                </span>
                                <span className="opacity-70 text-xs flex flex-col md:text-sm text-gray-400 font-black">
                                    Actualizado {formatearFechaHora(updatedAt)}
                                </span>
                            </h1>
                            {/* Acciones del Proyecto */}
                            <div className="sm:flex items-center gap-4 hidden">
                                {/* Editar Proyecto */}
                                {admin && (
                                    <div className="hidden sm:flex">
                                        <Tooltip
                                            className="bg-sky-500 font-black uppercase"
                                            id="editar-proyecto"
                                        />
                                        <Link
                                            className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                                            to={`/proyectos/editar/${id}`}
                                            data-tooltip-id="editar-proyecto"
                                            data-tooltip-content="Editar Proyecto"
                                        >
                                            <FiEdit2 fontSize={25} />
                                        </Link>
                                    </div>
                                )}
                                {/* Eliminar Proyecto */}
                                {admin && (
                                    <div className="hidden sm:flex">
                                        <Tooltip
                                            className="bg-red-500 font-black uppercase"
                                            id="eliminar-proyecto"
                                        />
                                        <button
                                            onClick={() =>
                                                handleDeleteProyecto(id, nombre)
                                            }
                                            className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                                            data-tooltip-id="eliminar-proyecto"
                                            data-tooltip-content="Eliminar Proyecto"
                                        >
                                            <FiTrash2 fontSize={25} />
                                        </button>
                                    </div>
                                )}
                                {/* Creador del Proyecto */}
                                <div className="hidden sm:flex">
                                    <Tooltip
                                        className="bg-teal-500 font-black uppercase"
                                        id="usuario"
                                    />
                                    <button
                                        className="text-teal-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-teal-500 rounded-lg p-1"
                                        data-tooltip-id="usuario"
                                        data-tooltip-content="Creador del Proyecto"
                                        onClick={() =>
                                            setModalUsuario(!modalUsuario)
                                        }
                                    >
                                        <AiOutlineUser fontSize={25} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Cliente del Proyecto */}
                        <h2 className="text-sky-600 text-xl sm:text-2xl md:text-3xl font-black">
                            {cliente}
                        </h2>

                        {/* Acciones del Proyecto */}
                        <div className="sm:hidden items-center gap-4 flex mt-4">
                            {/* Editar Proyecto */}
                            {admin && (
                                <div className="sm:hidden flex">
                                    <Tooltip
                                        className="bg-sky-500 font-black uppercase"
                                        id="editar-proyecto"
                                    />
                                    <Link
                                        className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                                        to={`/proyectos/editar/${id}`}
                                        data-tooltip-id="editar-proyecto"
                                        data-tooltip-content="Editar Proyecto"
                                    >
                                        <FiEdit2 fontSize={25} />
                                    </Link>
                                </div>
                            )}
                            {/* Eliminar Proyecto */}
                            {admin && (
                                <div className="sm:hidden flex">
                                    <Tooltip
                                        className="bg-red-500 font-black uppercase"
                                        id="eliminar-proyecto"
                                    />
                                    <button
                                        onClick={() =>
                                            handleDeleteProyecto(id, nombre)
                                        }
                                        className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                                        data-tooltip-id="eliminar-proyecto"
                                        data-tooltip-content="Eliminar Proyecto"
                                    >
                                        <FiTrash2 fontSize={25} />
                                    </button>
                                </div>
                            )}
                            {/* Creador del Proyecto */}
                            <div className="sm:hidden flex">
                                <Tooltip
                                    className="bg-teal-500 font-black uppercase"
                                    id="usuario"
                                />
                                <button
                                    className="text-teal-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-teal-500 rounded-lg p-1"
                                    data-tooltip-id="usuario"
                                    data-tooltip-content="Creador del Proyecto"
                                    onClick={() =>
                                        setModalUsuario(!modalUsuario)
                                    }
                                >
                                    <AiOutlineUser fontSize={25} />
                                </button>
                            </div>
                        </div>

                        {/* Agregar Tareas */}
                        {admin && (
                            <button
                                className="flex gap-1 justify-center items-center text-sm px-5 py-3 w-full sm:w-auto rounded-lg uppercase font-black bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white text-center mt-5"
                                type="button"
                                onClick={handleModalTarea}
                            >
                                <TbSubtask fontSize={20} />
                                Agregar Tarea
                            </button>
                        )}
                    </div>
                    {/* Descripcion y Jerarquias */}
                    <div className="p-5 sm:p-7 md:p-10">
                        {/* Descripcion */}
                        <h2 className="text-gray-200 font-black uppercase text-lg">
                            Descripcion del Proyecto
                        </h2>
                        <p className="text-gray-300 font-bold py-5">
                            {descripcion}
                        </p>
                    </div>

                    {/* Tareas */}
                    <div className="p-5 sm:p-7 md:p-10">
                        {/* Titulo */}
                        <h2 className="text-gray-200 font-black uppercase text-lg mt-10">
                            Tareas del Proyecto
                        </h2>
                        {/* Listado de las Tareas */}
                        <div className="mt-10">
                            {/* Tarea */}
                            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {proyecto?.tareas?.length ? (
                                    proyecto.tareas?.map((tarea) => (
                                        <Tarea key={tarea._id} tarea={tarea} />
                                    ))
                                ) : (
                                    <p className="text-center my-5 p-10 uppercase font-black text-gray-50">
                                        No hay tareas en este proyecto
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Colaboradores */}
                    <div className="p-5 sm:p-7 md:p-10">
                        {/* Titulo */}
                        <h2 className="text-gray-200 font-black uppercase text-lg mt-10">
                            Colaboradores del Proyecto
                        </h2>
                        {/* Agregar Colaboradores */}
                        {admin && (
                            <Link
                                className="flex justify-center items-center sm:inline-block text-sm px-5 py-3 w-full sm:w-auto rounded-lg uppercase font-black bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white text-center mt-5"
                                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                            >
                                <div className="flex gap-1 justify-center items-center">
                                    <BsPersonPlusFill fontSize={20} />
                                    Agregar Colaborador(a)
                                </div>
                            </Link>
                        )}

                        {/* Listado de Colaboradores */}
                        <div className="mt-10">
                            <div className="grid 2md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                                {proyecto?.colaboradores?.length ? (
                                    proyecto?.colaboradores?.map(
                                        (colaborador) => (
                                            <Colaborador
                                                key={colaborador._id}
                                                colaborador={colaborador}
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="text-center my-5 p-10 uppercase font-black text-gray-50">
                                        No hay Colaboradores en este proyecto
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {editando && (
                        <div className="fixed top-0 right-0 mt-24 mr-8 ml-4">
                            <p className="text-sky-500 uppercase font-black text-lg">
                                <Typewriter
                                    words={['Editando...']}
                                    loop={true}
                                    cursor={true}
                                    typeSpeed={70}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </p>
                        </div>
                    )}

                    {/* Modal de Tareas */}
                    <ModalTarea />

                    {/* Modal del Creador */}
                    <ModalUsuario
                        modalUsuario={modalUsuario}
                        setModalUsuario={setModalUsuario}
                        creador={creador}
                    />
                </>
            )}
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
