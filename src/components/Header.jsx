// ---- IMPORTACIONES ---- //
import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (HEADER) ---- //
export default function Header() {
    return (
        <header className="px-4 py-5 shadow-lg bg-[#111111] border-b border-b-[#0e0d0d]">
            {/* Header */}
            <div className="flex flex-col items-center gap-6 md:gap-0 md:flex-row md:justify-between">
                {/* Logo */}
                <h2 className="text-4xl text-sky-600 font-black text-center hover:text-teal-500 transition-colors duration-300 select-none">
                    UpTask
                </h2>
                {/* Barra de Busqueda */}
                <input
                    type="search"
                    placeholder="Buscar Proyecto"
                    className="rounded-xl lg:w-96 block p-2 border-[3px] text-gray-50 bg-gray-800 border-gray-600 hover:border-teal-500 transition-colors duration-300 focus:border-[3px] focus:border-teal-500"
                />
                {/* Proyectos */}
                <div className="flex gap-5 justify-center items-center">
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
    );
}
// ---- ---- ---- ---- ---- ---- //
