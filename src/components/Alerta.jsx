// ---- COMPONENTE (REGISTRO DE USUARIO) ---- //
export default function Alerta({ mensaje, error }) {
	return (
		<p
			className={`text-gray-50 border-[4px] ${
				error
					? 'bg-red-500 border-red-700'
					: 'bg-teal-500 border-teal-700'
			} uppercase font-bold text-center mt-6 p-2 rounded-3xl`}
		>
			{mensaje}
		</p>
	);
}
// ---- ---- ---- ---- ---- //
