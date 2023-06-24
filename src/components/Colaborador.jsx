// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import { MdOutlineEmail } from 'react-icons/md';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (COLABORADOR) ---- //
export default function Colaborador({ colaborador }) {
    // ---- CONTEXTs ---- //
    const { handleDeleteColaborador, proyecto } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- DATOS ---- //
    const { nombre, email, _id } = colaborador;
    // ---- ---- ---- //

    return (
        <div className="bg-gray-900 shadow rounded-lg border-[3px] border-gray-950 hover:border-teal-500 transition-colors duration-300 p-5 flex flex-col cel:flex-row cel:justify-between cel:items-center">
            {/* Datos del Colaborador */}
            <div>
                <p className="flex items-center gap-2 text-gray-50 font-black uppercase">
                    <span className="text-sky-500">
                        <BsFillPersonBadgeFill fontSize={20} />
                    </span>{' '}
                    {nombre}
                </p>
                <p className="flex items-center gap-2 text-gray-300 font-bold">
                    <span className="text-sky-500">
                        <MdOutlineEmail fontSize={20} />
                    </span>
                    {email}
                </p>
            </div>
            {/* Acciones para el Colaborador */}
            <div className="flex justify-end w-full mt-3 cel:mt-0 cel:w-auto">
                {/* Eliminar */}
                <div className="cel:ml-10">
                    <Tooltip
                        className="bg-red-500 font-black uppercase"
                        id="eliminar-colaborador"
                    />
                    <button
                        onClick={() =>
                            handleDeleteColaborador(_id, nombre, proyecto?._id)
                        }
                        data-tooltip-id="eliminar-colaborador"
                        data-tooltip-content="Eliminar Colaborador"
                        className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                    >
                        <FiTrash2 fontSize={25} />
                    </button>
                </div>
            </div>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- ---- //
