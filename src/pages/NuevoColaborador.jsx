// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import { MdOutlineEmail } from 'react-icons/md';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import FormularioColaborador from '../components/FormularioColaborador';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (NUEVO COLABORADOR) ---- //
export default function NuevoColaborador() {
    // ---- CONTEXTs ---- //
    const {
        obtenerProyecto,
        proyecto,
        colaborador,
        cargando,
        agregarColaborador,
        alerta,
        setAlerta,
    } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- ID ---- //
    const { id } = useParams();
    // ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        obtenerProyecto(id);
        setAlerta({ msg: '', error: false });
    }, []);
    // ---- ---- ---- ---- //

    return (
        <>
            {/* Titulo y Volver */}
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center justify-between p-5 sm:p-7 md:p-10">
                {/* Titulo */}
                <div>
                    {/* Titulo */}
                    <h1 className="text-3xl cel:text-4xl font-black text-gray-500">
                        Añadir Colaborador(a):
                    </h1>
                    {!proyecto?.nombre ? (
                        <Spinner />
                    ) : (
                        <h2 className="text-sky-500 hover:text-teal-500 transition-colors duration-300 font-black text-3xl cel:text-4xl">
                            {proyecto?.nombre}
                        </h2>
                    )}
                </div>
                {/* Volver */}
                <div className="flex">
                    <Tooltip
                        className="bg-sky-500 font-black uppercase"
                        id="volver"
                    />
                    <Link
                        className="flex text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                        to={`/proyectos/${proyecto._id}`}
                        data-tooltip-id="volver"
                        data-tooltip-content="Volver al Proyecto"
                    >
                        <IoReturnDownBackOutline fontSize={25} />
                    </Link>
                </div>
            </div>

            {/* Formulario para añadir colaborador */}
            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>
            {/* Datos del Colaborador */}
            <div className="flex flex-col gap-8 justify-center items-center w-full my-10">
                <div className="w-full md:w-2/3 xl:w-1/2">
                    {cargando ? (
                        <Spinner />
                    ) : (
                        colaborador?._id && (
                            <div className="flex flex-col bg-[#0e0e0e] shadow-lg border border-[#080808] p-5 rounded-lg">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    {/* Titulo */}
                                    <h3 className="inline-block text-base cel:text-lg leading-6 font-black text-gray-50 uppercase hover:text-teal-500 transition-colors duration-300">
                                        El usuario buscado es:
                                    </h3>
                                    {/* Datos del Colaborador del Buscado */}
                                    <div className="flex flex-col md:flex-row gap-4 my-10">
                                        {/* Nombre del Colaborador */}
                                        <p className="flex gap-2 text-gray-200 font-black text-sm cel:text-base">
                                            <span className="text-sky-500">
                                                <BsFillPersonBadgeFill className="text-xl cel:text-2xl" />
                                            </span>{' '}
                                            <span className="hover:text-teal-500 transition-colors duration-300">
                                                {colaborador?.nombre}
                                            </span>
                                        </p>
                                        {/* Email del Colaborador */}
                                        <p className="flex gap-2 text-gray-200 font-black text-sm cel:text-base">
                                            <span className="text-sky-500 text-sm">
                                                <MdOutlineEmail className="text-xl cel:text-2xl" />
                                            </span>
                                            <span className="hover:text-teal-500 transition-colors duration-300">
                                                {colaborador?.email}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Boton Enviar */}
                                <button
                                    className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 mt-3 uppercase font-bold rounded-xl transition-colors duration-300"
                                    type="button"
                                    onClick={() =>
                                        agregarColaborador(colaborador)
                                    }
                                >
                                    Agregar al Proyecto
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
            {/* Alerta Exito */}
            {alerta.exito && (
                <div className="flex justify-center w-full">
                    <p className="from-sky-500 to-sky-600 bg-gradient-to-br text-center p-2 rounded-xl uppercase text-white font-black sm:text-sm text-xs my-5">
                        Colaborador añadido correctamente
                    </p>
                </div>
            )}
        </>
    );
}
// ---- ---- ---- ---- ---- ---- ---- //
