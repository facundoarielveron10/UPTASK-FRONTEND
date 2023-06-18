// ---- IMPORTACIONES ---- //
import { Fragment, useState, useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { Dialog, Transition } from '@headlessui/react';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- OPCIONES ---- //
const PRIORIDAD = ['Baja', 'Media', 'Alta'];
// ---- ---- ---- ---- //

// ---- COMPONENTE (MODAL PARA TAREAS) ---- //
const ModalFormularioTarea = () => {
    // ---- CONTEXTs ---- //
    const {
        modalTarea,
        handleModalTarea,
        mostrarAlerta,
        alerta,
        submitTarea,
        exito,
        tarea,
    } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [idTarea, setIdTarea] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [prioridad, setPrioridad] = useState('');
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        if (tarea?._id) {
            setIdTarea(tarea._id);
            setNombre(tarea.nombre);
            setDescripcion(tarea.descripcion);
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
            setPrioridad(tarea.prioridad);
            return;
        }
        setIdTarea('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setPrioridad('');
    }, [tarea]);

    // ---- ---- ---- ---- //

    // ---- ID DEL PROYECTO ---- //
    const { id } = useParams();
    // ---- ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleSubmit = async (e) => {
        // VALIDACION DEL FORMULARIO
        e.preventDefault();

        // VERIFICAMOS QUE NO HAYA ERRORES
        if ([nombre, descripcion, prioridad].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true,
            });

            return;
        }

        // PASAR DATOS AL PROVIDER
        await submitTarea({
            idTarea,
            nombre,
            descripcion,
            fechaEntrega,
            prioridad,
            proyecto: id,
        });

        setTimeout(() => {
            setIdTarea('');
            setNombre('');
            setDescripcion('');
            setFechaEntrega('');
            setPrioridad('');
        }, 1500);
    };
    // ---- ---- ---- ---- //

    return (
        <Transition.Root show={modalTarea} as={Fragment}>
            {/* Modal */}
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleModalTarea}
            >
                {/* Contenedor del Modal */}
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#080808] bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* Este elemento es para engañar al navegador para que centre los contenidos modales. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    {/* Cerrar Modal */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        {/* Contenido del Modal */}
                        <div className="inline-block align-bottom bg-[#101010] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            {/* Contenedor de Cerrar el Modal */}
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                {/* Boton de Cerrar Modal */}
                                <button
                                    type="button"
                                    className="bg-[#101010] rounded-md text-gray-300 hover:text-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                    onClick={handleModalTarea}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* Modal */}
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    {/* Titulo */}
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-black text-gray-50 uppercase"
                                    >
                                        {idTarea
                                            ? 'Editar Tarea'
                                            : 'Crear Tarea'}
                                    </Dialog.Title>

                                    {/* Alerta Error */}
                                    {alerta.error &
                                    [nombre, descripcion, prioridad].includes(
                                        ''
                                    ) ? (
                                        <Alerta alerta={alerta} />
                                    ) : null}

                                    {/* Formulario */}
                                    <form
                                        className="my-10"
                                        onSubmit={handleSubmit}
                                    >
                                        {/* Nombre de la tarea */}
                                        <div className="mb-5">
                                            <label
                                                className={`${
                                                    exito
                                                        ? 'text-teal-500'
                                                        : 'text-gray-200'
                                                } ${
                                                    alerta.error &
                                                    [nombre].includes('')
                                                        ? 'text-red-500'
                                                        : 'text-gray-200'
                                                } transition-colors duration-300 uppercase font-black text-sm`}
                                                htmlFor="nombre"
                                            >
                                                Nombre de la Tarea
                                            </label>
                                            <input
                                                className={`${
                                                    exito
                                                        ? 'border-teal-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } ${
                                                    alerta.error &
                                                    [nombre].includes('')
                                                        ? 'border-red-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } text-gray-50 border-[3px] focus:border-teal-500 transition-colors duration-300 w-full p-2 mt-2 bg-gray-800 placeholder-gray-400 rounded-md`}
                                                id="nombre"
                                                type="text"
                                                placeholder="Nombre de la Tarea"
                                                value={nombre}
                                                disabled={exito ? true : false}
                                                onChange={(e) =>
                                                    setNombre(e.target.value)
                                                }
                                            />
                                        </div>
                                        {/* Descripcion de la tarea */}
                                        <div className="mb-5">
                                            <label
                                                className={`${
                                                    exito
                                                        ? 'text-teal-500'
                                                        : 'text-gray-200'
                                                } ${
                                                    alerta.error &
                                                    [descripcion].includes('')
                                                        ? 'text-red-500'
                                                        : 'text-gray-200'
                                                } transition-colors duration-300 uppercase font-black text-sm`}
                                                htmlFor="descripcion"
                                            >
                                                Descripcion de la Tarea
                                            </label>
                                            <textarea
                                                className={`${
                                                    exito
                                                        ? 'border-teal-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } ${
                                                    alerta.error &
                                                    [descripcion].includes('')
                                                        ? 'border-red-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } text-gray-50 border-[3px] focus:border-teal-500 transition-colors duration-300 w-full p-2 mt-2 bg-gray-800 placeholder-gray-400 rounded-md`}
                                                id="descripcion"
                                                placeholder="Descripcion de la Tarea"
                                                value={descripcion}
                                                rows={4}
                                                disabled={exito ? true : false}
                                                onChange={(e) =>
                                                    setDescripcion(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Fecha de Entrega de la tarea */}
                                        <div className="mb-5">
                                            <label
                                                className={`${
                                                    exito
                                                        ? 'text-teal-500'
                                                        : 'text-gray-200'
                                                } ${
                                                    alerta.error &
                                                    [fechaEntrega].includes('')
                                                        ? 'text-red-500'
                                                        : 'text-gray-200'
                                                } transition-colors duration-300 uppercase font-black text-sm`}
                                                htmlFor="fecha-entrega"
                                            >
                                                Fecha de Entrega de la Tarea
                                            </label>
                                            <input
                                                className={`${
                                                    exito
                                                        ? 'border-teal-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } ${
                                                    alerta.error &
                                                    [fechaEntrega].includes('')
                                                        ? 'border-red-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } text-gray-50 border-[3px] focus:border-teal-500 transition-colors duration-300 w-full p-2 mt-2 bg-gray-800 placeholder-gray-400 rounded-md`}
                                                id="fecha-entrega"
                                                type="date"
                                                value={fechaEntrega}
                                                disabled={exito ? true : false}
                                                onChange={(e) =>
                                                    setFechaEntrega(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Prioridad de la tarea */}
                                        <div className="mb-5">
                                            <label
                                                className={`${
                                                    exito
                                                        ? 'text-teal-500'
                                                        : 'text-gray-200'
                                                } ${
                                                    alerta.error &
                                                    [prioridad].includes('')
                                                        ? 'text-red-500'
                                                        : 'text-gray-200'
                                                } transition-colors duration-300 uppercase font-black text-sm`}
                                                htmlFor="prioridad"
                                            >
                                                Prioridad de la Tarea
                                            </label>
                                            <select
                                                className={`${
                                                    exito
                                                        ? 'border-teal-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } ${
                                                    alerta.error &
                                                    [prioridad].includes('')
                                                        ? 'border-red-500'
                                                        : 'border-gray-900 hover:border-teal-500'
                                                } text-gray-50 border-[3px] focus:border-teal-500 transition-colors duration-300 w-full p-2 mt-2 bg-gray-800 placeholder-gray-400 rounded-md`}
                                                id="prioridad"
                                                value={prioridad}
                                                onChange={(e) =>
                                                    setPrioridad(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    -- Seleccionar --
                                                </option>

                                                {PRIORIDAD.map((opcion) => (
                                                    <option key={opcion}>
                                                        {opcion}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Boton Enviar */}
                                        <input
                                            className="w-full bg-sky-500 hover:bg-sky-600 transition-colors duration-300 p-3 text-gray-50 uppercase font-black cursor-pointer rounded"
                                            type="submit"
                                            value={`${
                                                idTarea
                                                    ? 'Editar Tarea'
                                                    : 'Crear Tarea'
                                            }`}
                                            disabled={exito ? true : false}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default ModalFormularioTarea;
// ---- ---- ---- ---- ---- //
