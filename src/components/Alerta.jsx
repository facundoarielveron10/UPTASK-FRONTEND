// ---- COMPONENTE (ALERTA) ---- //
export default function Alerta({ alerta }) {
	return (
		<div
			className={`${
				alerta.error
					? 'from-red-500 to-red-600'
					: 'from-sky-500 to-sky-600'
			} bg-gradient-to-br text-center p-2 rounded-xl uppercase text-white font-black sm:text-sm text-xs my-5`}
		>
			{alerta.msg}
		</div>
	);
}
// ---- ---- ---- ---- ---- //
