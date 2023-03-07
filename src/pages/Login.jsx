// ---- IMPORTACIONES ---- //
import { Link } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (INICIO DE SESION) ---- //
export default function Login() {
    return (
        <>
            {/* Informacion */}
            <h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
                Inicia sesion y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Formulario */}
            <form className="my-10 shadow rounded-lg">
                {/* Email */}
                <div className="my-5">
                    {/* Texto Ayuda */}
                    <label
                        className="uppercase block text-xl font-bold text-gray-50"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    {/* Tu Email */}
                    <input
                        className="w-full mt-3 p-3 border-[3px] border-gray-600 hover:border-teal-500 transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-[3px] focus:border-teal-500"
                        type="email"
                        id="email"
                        placeholder="¿Pondrias tu Email?"
                    />
                </div>
                {/* Password */}
                <div className="my-5">
                    {/* Texto Ayuda */}
                    <label
                        className="uppercase block text-xl font-bold text-gray-50"
                        htmlFor="password"
                    >
                        Contraseña
                    </label>
                    {/* Tu Password */}
                    <input
                        className="w-full mt-3 p-3 border-[3px] border-gray-600 hover:border-teal-500 transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-[3px] focus:border-teal-500"
                        type="password"
                        id="password"
                        placeholder="¿Pondrias tu Contraseña?"
                    />
                </div>

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
