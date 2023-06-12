// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (REGISTRO DE USUARIO) ---- //
export default function Registrar() {
	// ---- CONTEXTs ---- //
	const { mostrarAlerta, alerta, setAlerta } = useAuth();
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		setAlerta({ msg: '', error: false });
	}, []);
	// ---- ---- ---- ---- //

	// ---- ESTADOS ---- //
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [error, setError] = useState(false);

	// ---- FUNCIONES ---- //
	const handleSubmit = async e => {
		// VALIDACION DEL FORMULARIO
		e.preventDefault();

		// VERIFICAMOS QUE NO HAYA ERRORES
		if ([nombre, email, password, repetirPassword].includes('')) {
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

		// ENVIAR LOS DATOS
		try {
			const { data } = await clienteAxios.post('/usuarios', {
				nombre,
				email,
				password,
			});
			setError(false);
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
				Crea tu cuenta y Administra tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta Error */}
			<div className="h-10 mt-5">
				{alerta.error &
					[nombre, email, password, repetirPassword].includes('') ||
				alerta.error & error ? (
					<Alerta alerta={alerta} />
				) : null}
			</div>

			{/* Formulario */}
			<form
				className="flex flex-col gap-4 shadow rounded-lg"
				onSubmit={handleSubmit}
			>
				{/* Nombre de Registro */}
				<div>
					{/* Texto Ayuda */}
					<label
						className={`${
							alerta.error & [nombre].includes('') ||
							alerta.error & error
								? 'text-red-500'
								: 'text-gray-50 hover:text-teal-500'
						} transition-colors duration-300 uppercase flex justify-between items-center text-xl font-bold `}
						htmlFor="nombre"
					>
						Tu Nombre
					</label>
					{/* Nombre */}
					<input
						className={`border-[3px] ${
							alerta.error & [nombre].includes('') ||
							alerta.error & error
								? 'border-red-500'
								: 'border-gray-900 hover:border-teal-500'
						} w-full mt-3 p-3 font-bold transition-colors duration-300 rounded-xl bg-gray-800 text-gray-50 focus:border-teal-500`}
						type="text"
						id="nombre"
						placeholder="¿Pondrias tu Nombre?"
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
				{/* Email de Registro */}
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
				{/* Password de Registro */}
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
				{/* Repetir Password de Registro */}
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
					value="Crear Cuenta"
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
