// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (INICIO DE SESION) ---- //
export default function Login() {
	// ---- CONTEXTs ---- //
	const { setAuth } = useAuth();
	// ---- ---- ---- ---- //

	// ---- NAVEGACION ---- //
	const navigate = useNavigate();
	// ---- ---- ---- ---- //

	// ---- ESTADOS ---- //
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const [errores, setErrores] = useState({
		emailUsuario: false,
		passwordUsuario: false,
	});
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		// ERRORES DE VALIDACION
		const error = {
			emailUsuario: false,
			passwordUsuario: false,
		};

		// VALIDACIONES DE CAMPOS REQUERIDO
		[email].includes('')
			? (error.emailUsuario = true)
			: (error.emailUsuario = false);

		[password].includes('')
			? (error.passwordUsuario = true)
			: (error.passwordUsuario = false);

		setErrores(error);
	}, [email, password]);
	// ---- ---- ---- ---- //

	// ---- FUNCIONES ---- //
	const handleSubmit = async e => {
		// VALIDACION DEL FORMULARIO
		e.preventDefault();
		setSubmit(true);

		// VERIFICAMOS QUE NO HAYA ERRORES
		let errorUsuario = false;
		Object.values(errores).map(error => {
			if (error === true) {
				errorUsuario = true;
			}
		});
		if (errorUsuario) {
			return;
		}

		// ENVIAR DATOS
		try {
			const { data } = await clienteAxios.post('/usuarios/login', {
				email,
				password,
			});
			setErrores({ emailUsuario: false, passwordUsuario: false });
			setAlerta({ msg: '', error: false });
			setSubmit(false);
			localStorage.setItem('token', data.token);
			setAuth(data);
			navigate('/proyectos');
		} catch (error) {
			// Mostramos el error
			setAlerta({ msg: error.response.data.msg, error: true });
		}
	};
	// ---- ---- ---- ---- //

	return (
		<>
			{/* Informacion */}
			<h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
				Inicia sesion y administra tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta */}
			{![alerta.msg].includes('') ? (
				<Alerta mensaje={alerta.msg} error={alerta.error} />
			) : null}

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
				{/* Password */}
				<Input
					dato={password}
					setDato={setPassword}
					placeholder="¿Pondrias tu Contraseña?"
					label={'Contraseña'}
					htmlFor={'password'}
					type={'password'}
					errores={errores.passwordUsuario}
					submit={submit}
					error={alerta}
				/>

				{/* Boton Enviar */}
				<input
					className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
					type="submit"
					value="Iniciar Sesion"
				/>
			</form>

			{/* Enlaces */}
			<nav className="lg:flex lg:justify-between">
				{/* Registro */}
				<Link
					className="block text-center my-5 font-bold text-sky-700 hover:text-teal-500 transition-colors duration-300 uppercase text-sm"
					to="/registrar"
				>
					¿No tienes una cuenta?, Registrate
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
