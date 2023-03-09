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
	igualdad = false,
	error,
}) {
	return (
		<div className="my-5">
			{/* Texto Ayuda */}
			<label
				className="uppercase flex justify-between items-center text-xl font-bold text-gray-50"
				htmlFor={htmlFor}
			>
				<span>{label}</span>
				<span className="flex flex-col text-red-500 text-sm">
					<span>{errores & submit ? 'Campo requerido' : null} </span>
					<span>
						{igualdad & submit
							? 'Las contraseñas no coinciden'
							: null}
					</span>
				</span>
			</label>
			{/* Tu Email */}
			<input
				className={`w-full mt-3 p-3 border-[3px] text-gray-50 font-bold ${
					errores & submit
						? 'border-red-500 hover:border-red-500'
						: 'border-gray-600 hover:border-teal-500'
				} ${
					igualdad & submit
						? 'border-red-500 hover:border-red-500'
						: 'border-gray-600 hover:border-teal-500'
				} ${
					![error.msg].includes('') & error.error & submit
						? 'border-red-500 hover:border-red-500'
						: 'border-gray-600 hover:border-teal-500'
				} ${
					![error.msg].includes('') & !error.error & submit
						? 'border-teal-500'
						: 'border-gray-600 hover:border-teal-500'
				} 
				} transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-[3px] focus:border-teal-500`}
				type={type}
				id={htmlFor}
				placeholder={placeholder}
				value={dato}
				onChange={e => setDato(e.target.value)}
			/>
		</div>
	);
}
