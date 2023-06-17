// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { FiTrash2 } from 'react-icons/fi';
import { BsInfoLg } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import FormularioProyecto from '../components/FormularioProyecto';
import ModalUsuario from '../components/ModalUsuario';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (EDITAR PROYECTO) ---- //
export default function EditarProyecto() {
    // ---- CONTEXTs ---- //
    const { obtenerProyecto, proyecto, cargando, handleDeleteProyecto } =
        useProyectos();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [modalUsuario, setModalUsuario] = useState(false);
    // ---- ---- ---- ---- //

    // ---- ID ---- //
    const { id } = useParams();
    // ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        obtenerProyecto(id);
    }, []);
    // ---- ---- ---- ---- //

    // ---- DATOS ---- //
    const { nombre, creador } = proyecto;
    // ---- ---- ---- //

    return cargando ? (
        <Spinner />
    ) : (
        <>
            {/* Titulo, Fecha de creacion y actualizacion */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                {/* Nombre del Proyecto a Editar */}
                <h1 className="flex flex-col text-gray-300 text-3xl sm:text-4xl md:text-5xl font-black">
                    <span className="text-sky-500">Editar Proyecto:</span>{' '}
                    {nombre}
                </h1>

                {/* Acciones del Proyecto */}
                <div className="flex items-center gap-4">
                    {/* Informacion del Proyecto */}
                    <div className="flex">
                        <Tooltip
                            className="bg-sky-500 font-black uppercase"
                            id="info-proyecto"
                        />
                        <Link
                            className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                            to={`/proyectos/${id}`}
                            data-tooltip-id="info-proyecto"
                            data-tooltip-content="Informacion del Proyecto"
                        >
                            <BsInfoLg fontSize={25} />
                        </Link>
                    </div>
                    {/* Eliminar Proyecto */}
                    <div>
                        <Tooltip
                            className="bg-red-500 font-black uppercase"
                            id="eliminar-proyecto"
                        />
                        <button
                            onClick={() => handleDeleteProyecto(id, nombre)}
                            className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                            data-tooltip-id="eliminar-proyecto"
                            data-tooltip-content="Eliminar Proyecto"
                        >
                            <FiTrash2 fontSize={25} />
                        </button>
                    </div>
                    {/* Creador del Proyecto */}
                    <div>
                        <Tooltip
                            className="bg-teal-500 font-black uppercase"
                            id="usuario"
                        />
                        <button
                            className="text-teal-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-teal-500 rounded-lg p-1"
                            data-tooltip-id="usuario"
                            data-tooltip-content="Creador del Proyecto"
                            onClick={() => setModalUsuario(!modalUsuario)}
                        >
                            <AiOutlineUser fontSize={25} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Formulario de edicion */}
            <div className="flex justify-center mb-14">
                <FormularioProyecto />
            </div>

            {/* Modal del Creado */}
            <ModalUsuario
                modalUsuario={modalUsuario}
                setModalUsuario={setModalUsuario}
                creador={creador}
            />
        </>
    );
}
// ---- ---- ---- ---- ---- ---- //
