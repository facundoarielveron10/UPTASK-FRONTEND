// ---- COMPONENTE (REGISTRO DE USUARIO) ---- //
export default function Alerta({ alerta }) {
    return (
        <div
            className={`${
                alerta.error
                    ? 'from-red-500 to-red-600'
                    : 'from-sky-500 to-sky-600'
            } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-3 `}
        >
            {alerta.msg}
        </div>
    );
}
// ---- ---- ---- ---- ---- //
