// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (Menu) ---- //
export default function Menu() {
    // ---- CONTEXTs ---- //
    const { proyectos } = useProyectos();
    // ---- ---- ---- ---- //

    return (
        <>
            {/* Boton Hamburguesa */}
            <div className="flex justify-end mr-16 my-4">
                <Tooltip
                    className="transition-all duration-300 bg-teal-500 font-black uppercase"
                    id="crear-proyecto"
                />
                <Link
                    to={'crear-proyecto'}
                    data-tooltip-id="crear-proyecto"
                    data-tooltip-content="Crear Proyecto"
                    className="text-sky-600 bg-[#090909] rounded-full p-2 border-[3px] border-sky-600 hover:border-teal-500 hover:text-teal-500 transition-all duration-300 cursor-pointer"
                >
                    <AiOutlinePlus fontSize={40} />
                </Link>
            </div>
        </>
    );
}
// ---- ---- ---- ---- ---- ---- //
