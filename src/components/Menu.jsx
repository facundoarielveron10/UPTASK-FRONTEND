// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import { IoHammerOutline } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { VscTools } from 'react-icons/vsc';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (Menu) ---- //
export default function Menu({ pathname }) {
    // ---- CONTEXTs ---- //
    const { proyectos } = useProyectos();
    // ---- ---- ---- ---- //

    return (
        <div
            className={`${
                (pathname === '/proyectos') & (proyectos.length === 0)
                    ? 'fixed bottom-0 w-full'
                    : ''
            } bg-[#090909] border-t-[3px] border-sky-500 pt-4 hover:border-teal-500 transition-all duration-300`}
        >
            {/* Menu */}
            <div className="flex flex-col items-center justify-center">
                {/* Enlace (Crear Proyecto) */}
                <div className="flex justify-between items-center bg-[#090909] w-full text-sky-600 hover:text-teal-500 transition-colors duration-300">
                    {/* Icono (Crear) */}
                    <div className="ml-10">
                        <IoHammerOutline fontSize={35} />
                    </div>
                    {/* Enlace (Crear Proyecto) */}
                    <Link
                        className="flex items-center font-bold uppercase my-4"
                        to="crear-proyecto"
                    >
                        Crear Proyecto
                    </Link>
                    {/* Icono (Crear) */}
                    <div className="mr-10">
                        <IoHammerOutline fontSize={35} />
                    </div>
                </div>
                {/* Enlace (Editar Proyecto) */}
                <div className="flex justify-between items-center bg-[#090909] w-full text-sky-600 hover:text-teal-500 transition-colors duration-300">
                    {/* Icono (Editar) */}
                    <div className="ml-10">
                        <FiEdit2 fontSize={35} />
                    </div>
                    {/* Enlace (Editar Proyecto) */}
                    <Link
                        className="flex items-center font-bold uppercase my-4 text-sky-600 hover:text-teal-500 transition-colors duration-300"
                        to="crear-proyecto"
                    >
                        Editar Proyecto
                    </Link>
                    {/* Icono (Crear) */}
                    <div className="mr-10">
                        <FiEdit2 fontSize={35} />
                    </div>
                </div>
                {/* Enlace (Configuracion) */}
                <div className="flex justify-between items-center bg-[#090909] w-full text-sky-600 hover:text-teal-500 transition-colors duration-300">
                    {/* Icono (Configuracion) */}
                    <div className="ml-10">
                        <VscTools fontSize={35} />
                    </div>
                    {/* Enlace (Configuracion) */}
                    <Link
                        className="flex items-center font-bold uppercase my-4 text-sky-600 hover:text-teal-500 transition-colors duration-300"
                        to="crear-proyecto"
                    >
                        Configuracion
                    </Link>
                    {/* Icono (Editar) */}
                    <div className="mr-10">
                        <VscTools fontSize={35} />
                    </div>
                </div>
            </div>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
