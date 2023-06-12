// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (OLVIDE PASSWORD) ---- //
export default function OlvidePassword() {
	// ---- CONTEXTs ---- //
	const { mostrarAlerta, alerta, setAlerta } = useAuth();
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		setAlerta({ msg: '', error: false });
	}, []);
	// ---- ---- ---- ---- //

	// ---- ESTADOS ---- //
	const [email, setEmail] = useState('');
	const [error, setError] = useState(false);
	// ---- ---- ---- ---- //

	// ---- FUNCIONES ---- //
	const handleSubmit = async e => {
		// VALIDACION DEL FORMULARIO
		e.preventDefault();

		// VALIDAMOS QUE NO HAYA ERRORES
		if ([email].includes('')) {
			mostrarAlerta({
				msg: 'Todos los Campos son Obligatorios',
				error: true,
			});

			return;
		}

		// ENVIAR DATOS
		try {
			const { data } = await clienteAxios.post(
				'/usuarios/olvide-password',
				{
					email,
				},
			);
			window.location.assign('/instrucciones');
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
				Recupera tu acceso no pierdas tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta Error */}
			<div className="h-10 mt-5">
				{alerta.error & [email].includes('') || alerta.error & error ? (
					<Alerta alerta={alerta} />
				) : null}
			</div>

			{/* Formulario */}
			<form
				className="flex flex-col gap-4 shadow rounded-lg"
				onSubmit={handleSubmit}
			>
				{/* Email de Recuperacion */}
				<div>
					{/* Texto Ayuda */}
					<label
						className={`${
							alerta.error & [email].includes('') ||
							alerta.error & error
								? 'text-red-500'
								: 'text-gray-50 hover:text-teal-500'
						} transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
						htmlFor="email"
					>
						Tu Email
					</label>
					{/* Email */}
					<input
						className={`border-[3px] ${
							alerta.error & [email].includes('') ||
							alerta.error & error
								? 'border-red-500'
								: 'border-gray-900 hover:border-teal-500'
						} w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
						type="email"
						id="email"
						placeholder="¿Pondrias tu Email?"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				{/* Boton Enviar */}
				<input
					className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
					type="submit"
					value="Enviar Instrucciones"
				/>
			</form>

			{/* Enlaces */}
			<nav className="lg:flex lg:justify-between">
				{/* Iniciar Sesion */}
				<Link
					className="block text-center my-5 font-bold text-sky-700 hover:text-teal-500 transition-colors duration-300 uppercase text-sm"
					to="/"
				>
					¿Ya tienes una cuenta?, Inicia Sesion
				</Link>
				{/* Registro */}
				<Link
					className="block text-center my-5 font-bold text-sky-700 hover:text-teal-500 transition-colors duration-300 uppercase text-sm"
					to="/registrar"
				>
					¿No tienes una cuenta?, Registrate
				</Link>
			</nav>
		</>
	);
}
// ---- ---- ---- ---- ---- //
