// ---- IMPORTACIONES ---- //
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (INICIO DE SESION) ---- //
export default function Login() {
	return (
		<>
			{/* Informacion */}
			<h1 className="text-sky-600 font-black text-4xl md:text-5xl lg:text-6xl capitalize">
				Inicia sesion y administra tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Formulario */}
			<form className="my-10 shadow rounded-lg">
				{/* Email */}
				<div className="my-5">
					{/* Texto Ayuda */}
					<label
						className="uppercase block text-xl font-bold text-gray-400"
						htmlFor="email"
					>
						Email
					</label>
					{/* Tu Email */}
					<input
						className="w-full mt-3 p-3 border border-gray-600 rounded-xl bg-gray-800 text-gray-400"
						type="email"
						id="email"
						placeholder="¿Pondrias tu Email?"
					/>
				</div>
				{/* Password */}
				<div className="my-5">
					{/* Texto Ayuda */}
					<label
						className="uppercase block text-xl font-bold text-gray-400"
						htmlFor="password"
					>
						Contraseña
					</label>
					{/* Tu Password */}
					<input
						className="w-full mt-3 p-3 border border-gray-600 rounded-xl bg-gray-800 text-gray-400"
						type="password"
						id="password"
						placeholder="¿Pondrias tu Contraseña?"
					/>
				</div>

				{/* Boton Enviar */}
				<input
					className="bg-sky-700 hover:bg-sky-800 text-gray-400 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
					type="submit"
					value="Iniciar Sesion"
				/>
			</form>
		</>
	);
}
// ---- ---- ---- ---- ---- //
