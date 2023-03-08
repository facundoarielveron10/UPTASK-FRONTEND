// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (NUEVO PASSWORD) ---- //
export default function NuevoPassword() {
    // ---- ESTADOS ---- //
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [errores, setErrores] = useState({
        emailUsuario: false,
    });
    // ---- ---- ---- ---- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        const error = {
            passwordUsuario: false,
            repetirPasswordUsuario: false,
        };

        [password].includes('')
            ? (error.passwordUsuario = true)
            : (error.passwordUsuario = false);

        [repetirPassword].includes('')
            ? (error.repetirPasswordUsuario = true)
            : (error.repetirPasswordUsuario = false);

        setErrores(error);
    }, [password, repetirPassword]);
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
                Reestablece tu contraseña y no pierdas acceso a tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Formulario */}
            <form className="my-10 shadow rounded-lg" onSubmit={handleSubmit}>
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
                    value="Guardar nuevo password"
                />
            </form>
        </>
    );
}
// ---- ---- ---- ---- ---- //
