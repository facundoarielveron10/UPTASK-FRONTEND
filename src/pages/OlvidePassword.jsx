// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (OLVIDE PASSWORD) ---- //
export default function OlvidePassword() {
	// ---- ESTADOS ---- //
	const [email, setEmail] = useState('');
	const [submit, setSubmit] = useState(false);
	const [errores, setErrores] = useState({
		emailUsuario: false,
	});
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		// ERRORES DE VALIDACION
		const error = {
			emailUsuario: false,
		};

		// VALIDACIONES DE CAMPOS REQUERIDO
		[email].includes('')
			? (error.emailUsuario = true)
			: (error.emailUsuario = false);

		setErrores(error);
	}, [email]);
	// ---- ---- ---- ---- //

	// ---- FUNCIONES ---- //
	const handleSubmit = e => {
		// VALIDACION DEL FORMULARIO
		e.preventDefault();
		setSubmit(true);

		// VALIDAMOS QUE NO HAYA ERRORES
		if (errores.emailUsuario) {
			return;
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

			{/* Formulario */}
			<form className="my-10 shadow rounded-lg" onSubmit={handleSubmit}>
				{/* Email */}
				<Input
					dato={email}
					setDato={setEmail}
					placeholder="¿Pondrias tu Email?"
					label={'Email'}
					htmlFor={'email'}
					type={'email'}
					errores={errores.emailUsuario}
					submit={submit}
					error={alerta}
				/>

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
