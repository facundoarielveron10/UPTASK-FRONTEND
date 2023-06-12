// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (CONFIRMAR CUENTA) ---- //
export default function ConfirmarCuenta() {
    // ---- CONTEXTs ---- //
    const { setAlerta, alerta, mostrarAlerta } = useAuth();
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [error, setError] = useState(false);
    // ---- ---- ---- ---- //

    // ---- TOKEN (URL) ---- //
    const params = useParams();
    const { id } = params;
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const { data } = await clienteAxios(
                    `/usuarios/confirmar/${id}`
                );
                setCuentaConfirmada(true);
            } catch (error) {
                // Mostramos el error
                mostrarAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
                setError(true);
            }
        };

        return () => {
            confirmarCuenta();
        };
    }, []);
    // ---- ---- ---- ---- //

    return (
        <>
            {/* Informacion */}
            <h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
                Confirma tu cuenta y Comienza a crear tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Alerta Error */}
            <div className="h-10 mt-5">
                {alerta.error || alerta.error & error ? (
                    <Alerta alerta={alerta} />
                ) : null}
            </div>

            {/* BOTON INICIAR SESION */}
            {cuentaConfirmada && (
                <>
                    <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-center p-2 rounded-xl uppercase text-white font-black sm:text-sm text-xs mt-10">
                        Cuenta confirmada correctamente
                    </div>

                    <Link
                        className="flex justify-center m-6 uppercase font-bold text-gray-50 bg-sky-600 border-[3px] border-sky-700 hover:bg-sky-700 hover:border-sky-800 transition-colors duration-300 rounded-lg p-3"
                        to="/"
                        reloadDocument
                    >
                        Iniciar Sesion
                    </Link>
                </>
            )}
        </>
    );
}
// ---- ---- ---- ---- ---- //
