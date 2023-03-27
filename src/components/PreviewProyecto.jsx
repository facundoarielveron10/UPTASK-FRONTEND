// ---- IMPORTACIONES ---- //
import { Link } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (PROYECTO) ---- //
export default function PreviewProyecto({ proyecto }) {
    // ---- PROYECTO ---- //
    const { nombre, _id, cliente } = proyecto;
    // ---- ---- ---- ---- //

    return (
        <div className="border-b-[3px] border-b-[#090909] last-of-type:border-b-0 p-5 flex flex-col justify-center items-center gap-7 sm:flex-row sm:gap-0">
            <p className="text-lg text-gray-300 font-black flex flex-col justify-center items-center gap-2 sm:flex-row sm:justify-start sm:gap-0 flex-1">
                {nombre}{' '}
                <span className="ml-2 text-sm font-bold border select-none border-gray-500 shadow-2xl p-1 rounded-full text-gray-500 uppercase">
                    {''}
                    {cliente}
                </span>
            </p>

            <Link
                className="text-sky-600 hover:text-teal-500 transition-colors duration-300 uppercase text-sm font-bold"
                to={`${_id}`}
            >
                Ver Proyecto
            </Link>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
