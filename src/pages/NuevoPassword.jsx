// ---- IMPORTACIONES ---- //
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (NUEVO PASSWORD) ---- //
export default function NuevoPassword() {
    return (
        <>
            {/* Informacion */}
            <h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
                Reestablece tu contraseña y no pierdas acceso a tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {/* Formulario */}
            <form className="my-10 shadow rounded-lg">
                {/* Password */}
                <div className="my-5">
                    {/* Texto Ayuda */}
                    <label
                        className="uppercase block text-xl font-bold text-gray-50"
                        htmlFor="password"
                    >
                        Nueva Contraseña
                    </label>
                    {/* Tu Password */}
                    <input
                        className="w-full mt-3 p-3 border-[3px] border-gray-600 hover:border-teal-500 transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-[3px] focus:border-teal-500"
                        type="password"
                        id="password"
                        placeholder="¿Pondrias tu Nueva Contraseña?"
                    />
                </div>
                {/* Repetir Password */}
                <div className="my-5">
                    {/* Texto Ayuda */}
                    <label
                        className="uppercase block text-xl font-bold text-gray-50"
                        htmlFor="password"
                    >
                        Repetir Contraseña
                    </label>
                    {/* Tu Password */}
                    <input
                        className="w-full mt-3 p-3 border-[3px] border-gray-600 hover:border-teal-500 transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-[3px] focus:border-teal-500"
                        type="password"
                        id="password"
                        placeholder="¿Pondrias repetir tu Nueva Contraseña?"
                    />
                </div>

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
