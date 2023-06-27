// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import { formatearFecha, compararFecha } from '../helpers/utilities';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { TiTickOutline } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (TAREA) ---- //
export default function Tarea({ tarea }) {
    // ---- CONTEXTs ---- //
    const { handleEditarTarea, handleDeleteTarea, completarTarea } =
        useProyectos();
    // ---- ---- ---- ---- //

    // ---- DATOS ---- //
    const {
        completado,
        descripcion,
        nombre,
        prioridad,
        fechaEntrega,
        estado,
        _id,
    } = tarea;
    const admin = useAdmin();
    // ---- ---- ---- ---- ---- ---- //

    return (
        <div
            className={`flex flex-col justify-between items-center bg-gray-900 shadow rounded-lg border-[3px] ${
                estado && 'border-green-500'
            } ${
                !estado & (compararFecha(fechaEntrega) == 1) &&
                'border-gray-950'
            } ${
                !estado & (compararFecha(fechaEntrega) == 3) &&
                'border-gray-950'
            } ${
                !estado & (compararFecha(fechaEntrega) == 2) && 'border-red-500'
            } p-5 transition-colors duration-300`}
        >
            {/* Completa o Incompleta */}
            <div className="flex flex-col gap-2 cel:flex-row justify-between w-full">
                <p className="flex gap-1 text-xs text-gray-50 uppercase font-black">
                    Entrega:{' '}
                    {compararFecha(fechaEntrega) == 1 && (
                        <span className="block text-green-500">
                            A tiempo de entrega
                        </span>
                    )}
                    {compararFecha(fechaEntrega) == 2 && (
                        <span className="block text-red-500">
                            No queda mas tiempo
                        </span>
                    )}
                    {compararFecha(fechaEntrega) == 3 && (
                        <span className="block text-orange-500">
                            Se entrega hoy
                        </span>
                    )}
                </p>
                <p className="flex text-xs gap-1 text-gray-50 uppercase font-black">
                    Tarea:
                    <span
                        className={`${
                            estado ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {estado ? 'Completada' : 'Incompleta'}
                    </span>
                </p>
            </div>
            {/* Datos de la tera */}
            <div className="flex flex-col items-start justify-between gap-2 w-full h-full">
                {/* Nombre y Descripcion de la tarea */}
                <div>
                    <p className="text-xl uppercase font-black text-gray-50">
                        {nombre}:
                    </p>
                    <p className="text-base font-bold text-gray-300">
                        {descripcion}
                    </p>
                </div>

                {/* Fecha de entrega de la tarea */}
                <div>
                    <p className="text-xl uppercase font-black text-gray-50">
                        Fecha de entrega:
                    </p>
                    <p className="text-base font-bold text-gray-300">
                        {formatearFecha(fechaEntrega)}
                    </p>
                </div>
                {/* Prioridad */}
                <div>
                    <p className="text-xl uppercase font-black text-gray-50">
                        Prioridad:
                    </p>
                    <p className="text-base font-bold text-gray-300">
                        {prioridad}
                    </p>
                </div>
                {/* Completado */}
                {estado && (
                    <div>
                        <p className="text-xl uppercase font-black text-gray-50">
                            Completada por:
                        </p>
                        <p className="text-base font-bold text-green-500">
                            {completado?.nombre}
                        </p>
                    </div>
                )}
            </div>
            {/* Acciones de la Tarea */}
            <div className="flex gap-10 mt-4">
                {/* Editar */}
                {admin && (
                    <div>
                        <Tooltip
                            className="bg-sky-500 font-black uppercase"
                            id="editar-tarea"
                        />
                        <button
                            onClick={() => handleEditarTarea(tarea)}
                            data-tooltip-id="editar-tarea"
                            data-tooltip-content="Editar Tarea"
                            className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                        >
                            <FiEdit2 fontSize={25} />
                        </button>
                    </div>
                )}
                {/* Eliminar */}
                {admin && (
                    <div>
                        <Tooltip
                            className="bg-red-500 font-black uppercase"
                            id="eliminar-tarea"
                        />
                        <button
                            onClick={() => handleDeleteTarea(tarea, nombre)}
                            data-tooltip-id="eliminar-tarea"
                            data-tooltip-content="Eliminar Tarea"
                            className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                        >
                            <FiTrash2 fontSize={25} />
                        </button>
                    </div>
                )}
                {/* Tarea Completa o Incompleta */}
                {admin ? (
                    <>
                        {estado ? (
                            // Incompleta
                            <div>
                                <Tooltip
                                    className="bg-rose-600 font-black uppercase"
                                    id="incompleta-tarea"
                                />
                                <button
                                    onClick={() => completarTarea(_id)}
                                    data-tooltip-id="incompleta-tarea"
                                    data-tooltip-content="Tarea Incompleta"
                                    className="text-rose-900 hover:text-rose-600 transition-color duration-300 border-[2px] border-rose-900 hover:border-rose-600 rounded-lg p-1"
                                >
                                    <IoClose fontSize={25} />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <Tooltip
                                    className="bg-green-500 font-black uppercase"
                                    id="completa-tarea"
                                />
                                <button
                                    onClick={() => completarTarea(_id)}
                                    data-tooltip-id="completa-tarea"
                                    data-tooltip-content="Tarea completa"
                                    className="text-green-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-green-500 rounded-lg p-1"
                                >
                                    <TiTickOutline fontSize={25} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    compararFecha(fechaEntrega) !== 2 && (
                        <>
                            {estado ? (
                                // Incompleta
                                <div>
                                    <Tooltip
                                        className="bg-rose-600 font-black uppercase"
                                        id="incompleta-tarea"
                                    />
                                    <button
                                        onClick={() => completarTarea(_id)}
                                        data-tooltip-id="incompleta-tarea"
                                        data-tooltip-content="Tarea Incompleta"
                                        className="text-rose-900 hover:text-rose-600 transition-color duration-300 border-[2px] border-rose-900 hover:border-rose-600 rounded-lg p-1"
                                    >
                                        <IoClose fontSize={25} />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Tooltip
                                        className="bg-green-500 font-black uppercase"
                                        id="completa-tarea"
                                    />
                                    <button
                                        onClick={() => completarTarea(_id)}
                                        data-tooltip-id="completa-tarea"
                                        data-tooltip-content="Tarea completa"
                                        className="text-green-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-green-500 rounded-lg p-1"
                                    >
                                        <TiTickOutline fontSize={25} />
                                    </button>
                                </div>
                            )}
                        </>
                    )
                )}
            </div>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
