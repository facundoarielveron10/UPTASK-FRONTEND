// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
// ---- ---- ---- ---- ---- //

// ---- FUNCIONES ---- //
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
// ---- ---- ---- ---- //

// ---- COMPONENTE (BUSQUEDA) ---- //
const Busqueda = () => {
    // ---- CONTEXTs ---- //
    const { buscador, handleBuscador, proyectos } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [busqueda, setBusqueda] = useState('');
    // ---- ---- ---- ---- //

    // ---- DATOS ---- //
    const proyectosFiltrados =
        busqueda === ''
            ? []
            : proyectos.filter((proyecto) =>
                  proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())
              );
    // ---- ---- ---- //

    return (
        <Transition.Root
            show={buscador}
            as={Fragment}
            afterLeave={() => setBusqueda('')}
        >
            {/* Modal del Buscador */}
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
                onClose={handleBuscador}
            >
                {/* Fondo Translusido */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-[#090909] bg-opacity-60 transition-opacity" />
                </Transition.Child>
                {/* Barra de Busqueda */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {/* Contenedor de la Barra */}
                    <Combobox
                        as="div"
                        className="mx-auto max-w-xl"
                        onChange={(proyecto) =>
                            (window.location = `/proyectos/${proyecto._id}`)
                        }
                    >
                        <div className="relative">
                            <Combobox.Input
                                className="h-12 w-full border-[3px] border-gray-900 rounded-lg bg-gray-800 pl-4 pr-4 text-gray-50 placeholder-gray-400 font-black sm:text-sm focus:border-teal-500"
                                placeholder="Buscar..."
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>

                        {proyectosFiltrados.length > 0 && (
                            <Combobox.Options
                                static
                                className="max-h-72 scroll-py-2 overflow-y-auto py-2 bg-gray-800 border-[3px] border-gray-900 rounded-lg text-gray-200 font-black"
                            >
                                {proyectosFiltrados.map((proyecto) => (
                                    <Combobox.Option
                                        key={proyecto._id}
                                        value={proyecto}
                                        className={({ active }) =>
                                            classNames(
                                                'cursor-default select-none rounded px-4 py-2',
                                                active &&
                                                    'bg-sky-600 text-gray-50'
                                            )
                                        }
                                    >
                                        {proyecto.nombre}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default Busqueda;
// ---- ---- ---- ---- ---- //
