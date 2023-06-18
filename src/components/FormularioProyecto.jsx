// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (FORMULARIO CREACION DE PROYECTOS) ---- //
export default function FormularioProyecto() {
    // ---- CONTEXTs ---- //
    const {
        mostrarAlerta,
        alerta,
        submitProyecto,
        proyecto,
        setAlerta,
        exito,
    } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- ID ---- //
    const { id } = useParams();
    // ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        // COMPLETAR FORMULARIO PARA EDITAR
        if (id) {
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        }
    }, [id]);

    useEffect(() => {
        setAlerta({ msg: '', error: false });
    }, []);
    // ---- ---- ---- ---- //

    // ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleSubmit = async (e) => {
        // VALIDACION DEL FORMULARIO
        e.preventDefault();

        // VERIFICAMOS QUE NO HAYA ERRORES
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true,
            });

            return;
        }

        // PASAR DATOS AL PROVIDER
        await submitProyecto({
            id,
            nombre,
            descripcion,
            fechaEntrega,
            cliente,
        });

        // RESETEAMOS TODOS LOS STATES
        setTimeout(() => {
            setAlerta({ msg: '', error: false });
            setNombre('');
            setDescripcion('');
            setFechaEntrega('');
            setCliente('');
        }, 1500);
    };
    // ---- ---- ---- ---- //

    return (
        <div className="flex flex-col gap-8 justify-center items-center w-full">
            {/* Alerta Error */}
            <div className="h-10">
                {alerta.error &
                [nombre, descripcion, fechaEntrega, cliente].includes('') ? (
                    <Alerta alerta={alerta} />
                ) : null}
            </div>

            <form
                className={`${
                    exito ? 'border-teal-500' : 'border-[#080808]'
                } border ${
                    alerta.error &
                    [nombre, descripcion, fechaEntrega, cliente].includes('')
                        ? 'border-red-500'
                        : 'border-[#080808]'
                } transition-colors duration-300 flex flex-col gap-4 bg-[#0e0e0e] shadow-2xl shadow-[#080808] py-10 px-5 w-full md:w-2/3 xl:w-1/2 rounded-lg`}
                onSubmit={handleSubmit}
            >
                {/* Nombre del Proyecto */}
                <div>
                    {/* Texto Ayuda */}
                    <label
                        className={`${
                            exito ? 'text-teal-500' : 'text-gray-50'
                        } ${
                            alerta.error & [nombre].includes('')
                                ? 'text-red-500'
                                : 'text-gray-50'
                        } transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
                        htmlFor="nombre"
                    >
                        Nombre del Proyecto
                    </label>
                    {/* Nombre */}
                    <input
                        className={` ${
                            exito
                                ? 'border-teal-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } border-[3px] ${
                            alerta.error & [nombre].includes('')
                                ? 'border-red-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
                        type="text"
                        id="nombre"
                        placeholder="Nombre del Proyecto"
                        value={nombre}
                        disabled={exito ? true : false}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                {/* Descripcion del Proyecto */}
                <div>
                    {/* Texto Ayuda */}
                    <label
                        className={`${
                            exito ? 'text-teal-500' : 'text-gray-50'
                        } ${
                            alerta.error & [descripcion].includes('')
                                ? 'text-red-500'
                                : 'text-gray-50'
                        } transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
                        htmlFor="descripcion"
                    >
                        <span>Descripcion del Proyecto</span>
                    </label>
                    {/* Descripcion */}
                    <textarea
                        className={`${
                            exito
                                ? 'border-teal-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } border-[3px] ${
                            alerta.error & [descripcion].includes('')
                                ? 'border-red-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
                        id="descripcion"
                        placeholder="Descripcion del Proyecto"
                        value={descripcion}
                        rows={4}
                        disabled={exito ? true : false}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                {/* Fecha de Entrega del Proyecto */}
                <div>
                    {/* Texto Ayuda */}
                    <label
                        className={`${
                            exito ? 'text-teal-500' : 'text-gray-50'
                        } ${
                            alerta.error & [fechaEntrega].includes('')
                                ? 'text-red-500'
                                : 'text-gray-50'
                        } transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
                        htmlFor="fecha-entrega"
                    >
                        <span>Fecha de Entrega del Proyecto</span>
                    </label>
                    {/* Fecha Entrega */}
                    <input
                        className={`${
                            exito
                                ? 'border-teal-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } border-[3px] ${
                            alerta.error & [fechaEntrega].includes('')
                                ? 'border-red-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
                        type="date"
                        id="fecha-entrega"
                        placeholder="Fecha de Entrega del Proyecto"
                        value={fechaEntrega}
                        disabled={exito ? true : false}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                    />
                </div>

                {/* Nombre del Cliente del Proyecto */}
                <div>
                    {/* Texto Ayuda */}
                    <label
                        className={`${
                            exito ? 'text-teal-500' : 'text-gray-50'
                        } ${
                            alerta.error & [cliente].includes('')
                                ? 'text-red-500'
                                : 'text-gray-50'
                        } transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
                        htmlFor="cliente"
                    >
                        <span>Cliente del Proyecto</span>
                    </label>
                    {/* Cliente */}
                    <input
                        className={`${
                            exito
                                ? 'border-teal-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } border-[3px] ${
                            alerta.error & [cliente].includes('')
                                ? 'border-red-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
                        type="text"
                        id="cliente"
                        placeholder="Cliente del Proyecto"
                        value={cliente}
                        disabled={exito ? true : false}
                        onChange={(e) => setCliente(e.target.value)}
                    />
                </div>

                {/* Boton Enviar */}
                <input
                    className={`${
                        alerta.error &
                        [nombre, descripcion, fechaEntrega, cliente].includes(
                            ''
                        )
                            ? 'bg-red-500'
                            : 'bg-sky-700 hover:bg-teal-500'
                    } cursor-pointer text-gray-50 w-full py-3 mt-3 uppercase font-bold rounded-xl transition-colors duration-300`}
                    type="submit"
                    value={`${id ? 'Editar Proyecto' : 'Crear Proyecto'}`}
                    disabled={exito ? true : false}
                />
            </form>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- //
