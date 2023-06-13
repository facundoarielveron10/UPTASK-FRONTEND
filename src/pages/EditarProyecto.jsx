// ---- IMPORTACIONES ---- //
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { BsInfoLg } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import FormularioProyecto from '../components/FormularioProyecto';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (EDITAR PROYECTO) ---- //
export default function EditarProyecto() {
    // ---- CONTEXTs ---- //
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
        useProyectos();
    // ---- ---- ---- ---- //

    // ---- ID ---- //
    const { id } = useParams();
    // ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        return () => {
            obtenerProyecto(id);
        };
    }, []);
    // ---- ---- ---- ---- //

    // ---- SWEET ALERTA ---- //
    const MySwal = withReactContent(Swal);
    // ---- ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleDelete = async () => {
        await MySwal.fire({
            title: '¿ESTAS SEGURO?',
            text: 'ESTAS A PUNTO DE ELIMINAR UN PROYECTO!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, ELIMINAR!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'ELIMINADO!',
                    'PROYECTO ELIMINADO CORRECTAMENTE',
                    'success'
                ).then((result) => {
                    eliminarProyecto(id);
                    if (result.isConfirmed) {
                        window.location.assign('/proyectos');
                    }
                });
            }
        });
    };
    // ---- ---- ---- ---- //

    // ---- DATOS ---- //
    const { nombre } = proyecto;
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
                    <Link
                        className="text-sky-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-sky-500 rounded-lg p-1"
                        to={`/proyectos/${id}`}
                    >
                        <BsInfoLg fontSize={25} />
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="text-red-500 opacity-80 hover:opacity-100 transition-opacity duration-300 border-[2px] border-red-500 rounded-lg p-1"
                    >
                        <FiTrash2 fontSize={25} />
                    </button>
                </div>
            </div>

            {/* Formulario de edicion */}
            <div className="flex justify-center mb-14">
                <FormularioProyecto />
            </div>
        </>
    );
}
// ---- ---- ---- ---- ---- ---- //
