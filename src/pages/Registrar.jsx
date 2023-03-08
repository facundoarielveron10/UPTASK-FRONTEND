// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (REGISTRO DE USUARIO) ---- //
export default function Registrar() {
    // ---- ESTADOS ---- //
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [errores, setErrores] = useState({
        nombreUsuario: false,
        emailUsuario: false,
        passwordUsuario: false,
        repetirPasswordUsuario: false,
    });
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        const error = {
            nombreUsuario: false,
            emailUsuario: false,
            passwordUsuario: false,
            repetirPasswordUsuario: false,
        };

        [nombre].includes('')
            ? (error.nombreUsuario = true)
            : (error.nombreUsuario = false);

        [email].includes('')
            ? (error.emailUsuario = true)
            : (error.emailUsuario = false);

        [password].includes('')
            ? (error.passwordUsuario = true)
            : (error.passwordUsuario = false);

        [repetirPassword].includes('')
            ? (error.repetirPasswordUsuario = true)
            : (error.repetirPasswordUsuario = false);

        setErrores(error);
    }, [nombre, email, password, repetirPassword]);
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
                Crea tu cuenta y Administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Formulario */}
            <form className="my-10 shadow rounded-lg" onSubmit={handleSubmit}>
                {/* Nombre */}
                <Input
                    dato={nombre}
                    setDato={setNombre}
                    placeholder="¿Pondrias tu Nombre?"
                    label={'Nombre'}
                    htmlFor={'nombre'}
                    type={'text'}
                    errores={errores.nombreUsuario}
                    submit={submit}
                />
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
                {/* Repetir Password */}
                <Input
                    dato={repetirPassword}
                    setDato={setRepetirPassword}
                    placeholder="¿Pondrias tu Nueva Contraseña?"
                    label={'Nueva Contraseña'}
                    htmlFor={'password2'}
                    type={'password'}
                    errores={errores.repetirPasswordUsuario}
                    submit={submit}
                />

                {/* Boton Enviar */}
                <input
                    className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
                    type="submit"
                    value="Crear Cuenta"
                />
            </form>

            {/* Enlaces */}
            <nav className="lg:flex lg:justify-between">
                {/* Iniciar Sesion */}
                <Link
                    className="block text-center my-5 font-bold text-sky-700 hover:text-teal-500 transition-colors duration-300 uppercase text-sm"
                    to="/"
                >
                    ¿Ya tienes una cuenta?, Inicia Sesion
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
