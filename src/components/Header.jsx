// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import Busqueda from './Busqueda';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (HEADER) ---- //
export default function Header() {
    // ---- CONTEXTs ---- //
    const { handleBuscador } = useProyectos();
    // ---- ---- ---- ---- //

    return (
        <>
            {/* Header */}
            <header className="px-4 py-5 shadow-lg bg-[#111111] border-b border-b-[#0e0d0d]">
                {/* Header */}
                <div className="flex flex-col items-center gap-6 md:gap-0 md:flex-row md:justify-between">
                    {/* Logo */}
                    <h2 className="text-4xl text-sky-500 font-black text-center hover:text-teal-500 transition-colors duration-300 select-none">
                        UpTask
                    </h2>
                    {/* Botones */}
                    <div className="flex gap-5 flex-col sm:flex-row justify-center items-center">
                        {/* Boton de Busqueda */}
                        <button
                            type="button"
                            className="font-bold uppercase text-gray-500"
                            onClick={handleBuscador}
                        >
                            Buscar Proyecto
                        </button>
                        <Link
                            to="/proyectos"
                            className="font-bold uppercase text-gray-500"
                        >
                            Proyectos
                        </Link>
                        <button
                            className="text-sky-600 hover:text-teal-500 transition-colors duration-300"
                            type="button"
                        >
                            <BiLogIn fontSize={35} />
                        </button>
                    </div>
                </div>
            </header>
            {/* Modal de barra de busqueda */}
            <Busqueda />
        </>
    );
}
// ---- ---- ---- ---- ---- ---- //
