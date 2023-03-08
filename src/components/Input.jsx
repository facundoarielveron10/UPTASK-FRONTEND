// ---- COMPONENTE (INPUT DEL PROYECTO) ---- //
export default function Input({
    dato,
    setDato,
    placeholder,
    label,
    htmlFor,
    type,
    errores,
    submit,
}) {
    return (
        <div className="my-5">
            {/* Texto Ayuda */}
            <label
                className="uppercase flex justify-between items-center text-xl font-bold text-gray-50"
                htmlFor={htmlFor}
            >
                <span>{label}</span>
                <span className="text-red-500 text-sm">
                    {errores & submit ? 'Campo requerido' : null}
                </span>
            </label>
            {/* Tu Email */}
            <input
                className={`w-full mt-3 p-3 border-[3px] ${
                    errores & submit
                        ? 'border-red-500'
                        : 'border-gray-600 hover:border-teal-500'
                } transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-[3px] focus:border-teal-500`}
                type={type}
                id={htmlFor}
                placeholder={placeholder}
                value={dato}
                onChange={(e) => setDato(e.target.value)}
            />
        </div>
    );
}
