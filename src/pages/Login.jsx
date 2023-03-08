// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (INICIO DE SESION) ---- //
export default function Login() {
    // ---- ESTADOS ---- //
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [errores, setErrores] = useState({
        emailUsuario: false,
        passwordUsuario: false,
    });
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        const error = {
            emailUsuario: false,
            passwordUsuario: false,
        };

        [email].includes('')
            ? (error.emailUsuario = true)
            : (error.emailUsuario = false);

        [password].includes('')
            ? (error.passwordUsuario = true)
            : (error.passwordUsuario = false);

        setErrores(error);
    }, [email, password]);
    // ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const handleSubmit = (e) => {
        // VALIDACION DEL FORMULARIO
        e.preventDefault();
        setSubmit(true);
    };
    // ---- ---- ---- ---- //

    return (
        <>
            {/* Informacion */}
            <h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
                Inicia sesion y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Formulario */}
            <form className="my-10 shadow rounded-lg" onSubmit={handleSubmit}>
                {/* Email */}
                <Input
                    dato={email}
                    setDato={setEmail}
                    placeholder="¿Pondrias tu Email?"
                    label={'Email'}
                    htmlFor={'email'}
                    type={'email'}
                    errores={errores.emailUsuario}
                    submit={submit}
                />
                {/* Password */}
                <Input
                    dato={password}
                    setDato={setPassword}
                    placeholder="¿Pondrias tu Contraseña?"
                    label={'Contraseña'}
                    htmlFor={'password'}
                    type={'password'}
                    errores={errores.passwordUsuario}
                    submit={submit}
                />

                {/* Boton Enviar */}
                <input
                    className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
                    type="submit"
                    value="Iniciar Sesion"
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
