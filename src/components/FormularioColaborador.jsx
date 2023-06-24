// ---- IMPORTACIONES ---- //
import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (FORMULARIO COLABORADOR) ---- //
export default function FormularioColaborador() {
    // ---- CONTEXTs ---- //
    const { mostrarAlerta, alerta, exito, submitColaborador, error } =
        useProyectos();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [email, setEmail] = useState('');
    // ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleSubmit = async (e) => {
        // VALIDACION DEL FORMULARIO
        e.preventDefault();

        // VERIFICAMOS QUE NO HAYA ERRORES
        if ([email].includes('')) {
            mostrarAlerta({
                msg: 'El campo de email es Obligatorio',
                error: true,
            });

            return;
        }

        // PASAR DATOS AL PROVIDER
        await submitColaborador(email);

        setEmail('');
    };
    // ---- ---- ---- ---- //

    return (
        <div className="flex flex-col gap-8 justify-center items-center w-full">
            {/* Alerta Error */}
            <div className="h-10">
                {alerta.error & [email].includes('') || alerta.error & error ? (
                    <Alerta alerta={alerta} />
                ) : null}
            </div>
            {/* Formulario */}
            <form
                className={`${
                    exito ? 'border-teal-500' : 'border-[#080808]'
                } border ${
                    alerta.error & [email].includes('') || alerta.error & error
                        ? 'border-red-500'
                        : 'border-[#080808]'
                } transition-colors duration-300 flex flex-col gap-4 bg-[#0e0e0e] shadow-xl shadow-[#080808] py-10 px-5 w-full md:w-2/3 xl:w-1/2 rounded-lg`}
                onSubmit={handleSubmit}
            >
                {/* Email del Colaborador */}
                <div>
                    {/* Texto Ayuda */}
                    <label
                        className={`${
                            exito ? 'text-teal-500' : 'text-gray-50'
                        } ${
                            alerta.error & [email].includes('') ||
                            alerta.error & error
                                ? 'text-red-500'
                                : 'text-gray-50'
                        } transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
                        htmlFor="email"
                    >
                        Email del Colaborador
                    </label>
                    {/* Email */}
                    <input
                        className={` ${
                            exito
                                ? 'border-teal-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } border-[3px] ${
                            alerta.error & [email].includes('') ||
                            alerta.error & error
                                ? 'border-red-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
                        type="email"
                        id="email"
                        placeholder="Email del Colaborador"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Boton Enviar */}
                <input
                    className={`${
                        alerta.error & [email].includes('') ||
                        alerta.error & error
                            ? 'bg-red-500'
                            : 'bg-sky-700 hover:bg-teal-500'
                    } cursor-pointer text-gray-50 w-full py-3 mt-3 uppercase font-bold rounded-xl transition-colors duration-300`}
                    type="submit"
                    value="Buscar Colaborador"
                    disabled={exito ? true : false}
                />
            </form>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- ---- ---- ---- //
