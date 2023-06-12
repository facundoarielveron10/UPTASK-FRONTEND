// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (NUEVO PASSWORD) ---- //
export default function NuevoPassword() {
	// ---- CONTEXTs ---- //
	const { mostrarAlerta, alerta } = useAuth();
	// ---- ---- ---- ---- //

	// ---- ESTADOS ---- //
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [tokenValido, setTokenValido] = useState(false);
	const [error, setError] = useState(false);
	// ---- ---- ---- ---- //

	// ---- TOKEN (URL) ---- //
	const params = useParams();
	const { token } = params;
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios(`/usuarios/olvide-password/${token}`);
				setTokenValido(true);
			} catch (error) {
				// Mostramos el error
				mostrarAlerta({
					msg: error.response.data.msg,
					error: true,
				});
				setError(true);
			}
		};

		return () => {
			comprobarToken();
		};
	}, []);
	// ---- ---- ---- ---- //

	// ---- FUNCIONES ---- //
	const handleSubmit = async e => {
		// VALIDACION DEL FORMULARIO
		e.preventDefault();

		// VERIFICAMOS QUE NO HAYA ERRORES
		if ([password, repetirPassword].includes('')) {
			mostrarAlerta({
				msg: 'Todos los Campos son Obligatorios',
				error: true,
			});

			return;
		}

		if (password != repetirPassword) {
			mostrarAlerta({
				msg: 'Las contraseñas son distintas',
				error: true,
			});
			setError(true);
			return;
		}

		// ENVIAR DATOS
		try {
			const { data } = await clienteAxios.post(
				`/usuarios/olvide-password/${token}`,
				{
					password,
				},
			);
			setError(false);
			window.location.assign('/');
		} catch (error) {
			// Mostramos el error
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			setError(true);
		}
	};
	// ---- ---- ---- ---- //

	return (
		<>
			{/* Informacion */}
			<h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
				Reestablece tu contraseña y no pierdas acceso a tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta Error */}
			<div className="h-10 mt-5">
				{alerta.error & [password, repetirPassword].includes('') ||
				alerta.error & error ? (
					<Alerta alerta={alerta} />
				) : null}
			</div>

			{/* Formulario */}
			{tokenValido ? (
				<form
					className="flex flex-col gap-4 shadow rounded-lg"
					onSubmit={handleSubmit}
				>
					{/* Password de Reestablecimiento */}
					<div>
						{/* Texto Ayuda */}
						<label
							className={`${
								alerta.error & [password].includes('') ||
								alerta.error & error
									? 'text-red-500'
									: 'text-gray-50 hover:text-teal-500'
							} transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
							htmlFor="password"
						>
							Tu Password
						</label>
						{/* Password */}
						<input
							className={`border-[3px] ${
								alerta.error & [password].includes('') ||
								alerta.error & error
									? 'border-red-500'
									: 'border-gray-900 hover:border-teal-500'
							} w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
							type="password"
							id="passwoord"
							placeholder="¿Pondrias tu Contraseña?"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{/* Repetir Password de Reestablecimiento */}
					<div>
						{/* Texto Ayuda */}
						<label
							className={`${
								alerta.error & [repetirPassword].includes('') ||
								alerta.error & error
									? 'text-red-500'
									: 'text-gray-50 hover:text-teal-500'
							} transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
							htmlFor="repetir-password"
						>
							Tu Password Nuevamente
						</label>
						{/* Password */}
						<input
							className={`border-[3px] ${
								alerta.error & [repetirPassword].includes('') ||
								alerta.error & error
									? 'border-red-500'
									: 'border-gray-900 hover:border-teal-500'
							} w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
							type="password"
							id="repetir-passwoord"
							placeholder="¿Pondrias Repetir tu Contraseña?"
							value={repetirPassword}
							onChange={e => setRepetirPassword(e.target.value)}
						/>
					</div>

					{/* Boton Enviar */}
					<input
						className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
						type="submit"
						value="Guardar nuevo password"
					/>
				</form>
			) : null}
		</>
	);
}
// ---- ---- ---- ---- ---- //
