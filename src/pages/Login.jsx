// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (INICIO DE SESION) ---- //
export default function Login() {
    // ---- CONTEXTs ---- //
    const { setAuth, mostrarAlerta, alerta, setAlerta } = useAuth();
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        setAlerta({ msg: '', error: false });
    }, []);
    // ---- ---- ---- ---- //

    // ---- ESTADOS ---- //
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [exito, setExito] = useState(false);
    // ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleSubmit = async (e) => {
        // VALIDACION DEL FORMULARIO
        e.preventDefault();

        // VERIFICAMOS QUE NO HAYA ERRORES
        if ([email, password].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true,
            });

            return;
        }

        // ENVIAR DATOS
        try {
            const { data } = await clienteAxios.post('/usuarios/login', {
                email,
                password,
            });
            setAlerta({ msg: '', error: false });
            setError(false);
            localStorage.setItem('token', data.token);
            setAuth(data);
            setExito(true);
            setTimeout(() => {
                window.location.assign('/proyectos');
            }, 1500);
        } catch (error) {
            // Mostramos el error
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true,
            });
            setError(true);
        }
    };
    // ---- ---- ---- ---- //

    return (
        <>
            {/* Informacion */}
            <h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
                Inicia sesion y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Alerta Error */}
            <div className="h-10 mt-5">
                {alerta.error & [email, password].includes('') ||
                alerta.error & error ? (
                    <Alerta alerta={alerta} />
                ) : null}
            </div>

            {/* Formulario */}
            <form
                className={`flex flex-col gap-4 shadow rounded-lg p-8 mt-4 border ${
                    exito ? 'border-teal-500' : 'border-[#080808]'
                } ${
                    alerta.error & [email, password].includes('') ||
                    alerta.error & error
                        ? 'border-red-500'
                        : 'border-[#080808]'
                }`}
                onSubmit={handleSubmit}
            >
                {/* Email del Usuario */}
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
                        Tu Email
                    </label>
                    {/* Email */}
                    <input
                        className={`${
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
                        placeholder="¿Pondrias tu Email?"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* Password del Usuario */}
                <div>
                    {/* Texto Ayuda */}
                    <label
                        className={`${
                            exito ? 'text-teal-500' : 'text-gray-50'
                        } ${
                            alerta.error & [password].includes('') ||
                            alerta.error & error
                                ? 'text-red-500'
                                : 'text-gray-50'
                        } transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
                        htmlFor="password"
                    >
                        Tu Password
                    </label>
                    {/* Password */}
                    <input
                        className={`${
                            exito
                                ? 'border-teal-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } border-[3px] ${
                            alerta.error & [password].includes('') ||
                            alerta.error & error
                                ? 'border-red-500'
                                : 'border-gray-900 hover:border-teal-500'
                        } w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
                        type="password"
                        id="password"
                        placeholder="¿Pondrias tu Contraseña?"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Boton Enviar */}
                <input
                    className={`${
                        alerta.error & [email, password].includes('') ||
                        alerta.error & error
                            ? 'bg-red-500'
                            : 'bg-sky-700 hover:bg-teal-500'
                    } cursor-pointer text-gray-50 w-full py-3 mt-3 uppercase font-bold rounded-xl transition-colors duration-300`}
                    type="submit"
                    value="Iniciar Sesion"
                    disabled={exito ? true : false}
                />
            </form>

            {/* Enlaces */}
            <nav className="lg:flex lg:justify-between">
                {/* Registro */}
                <Link
                    className="block text-center my-5 font-bold text-sky-700 hover:text-teal-500 transition-colors duration-300 uppercase text-sm"
                    to="/registrar"
                >
                    ¿No tienes una cuenta?, Registrate
                </Link>
                {/* Olvide Password */}
                <Link
                    className="block text-center my-5 font-bold text-sky-700 hover:text-teal-500 transition-colors duration-300 uppercase text-sm"
                    to="/olvide-password"
                >
                    ¿Olvidaste tu Password?, Reestablecer
                </Link>
            </nav>
        </>
    );
}
// ---- ---- ---- ---- ---- //
