// ---- IMPORTACIONES ---- //
import { formatearFecha } from '../helpers/utilities';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { TiTickOutline } from 'react-icons/ti';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (TAREA) ---- //
export default function Tarea({ tarea }) {
    const { descripcion, nombre, prioridad, fechaEntrega, _id } = tarea;
    return (
        <div className="border-b p-5 flex justify-between items-center">
            {/* Datos de la tera */}
            <div className="flex flex-col gap-2">
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
            </div>
            {/* Acciones de la Tarea */}
            <div className="flex flex-col gap-4">
                <button className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1">
                    <FiEdit2 fontSize={25} />
                </button>
                <button className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1">
                    <FiTrash2 fontSize={25} />
                </button>
                <button className="text-green-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-green-500 rounded-lg p-1">
                    <TiTickOutline fontSize={25} />
                </button>
            </div>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
