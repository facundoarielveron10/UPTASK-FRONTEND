// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (REGISTRO DE USUARIO) ---- //
export default function Registrar() {
	// ---- ESTADOS ---- //
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const [errores, setErrores] = useState({
		nombreUsuario: false,
		emailUsuario: false,
		passwordUsuario: false,
		repetirPasswordUsuario: false,
		igualdadPassword: false,
		longitudPassword: false,
	});
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		// ERRORES DE VALIDACION
		const error = {
			nombreUsuario: false,
			emailUsuario: false,
			passwordUsuario: false,
			repetirPasswordUsuario: false,
			igualdadPassword: false,
			longitudPassword: false,
		};

		// VALIDACIONES DE CAMPOS REQUERIDO
		[nombre].includes('')
			? (error.nombreUsuario = true)
			: (error.nombreUsuario = false);

		[email].includes('')
			? (error.emailUsuario = true)
			: (error.emailUsuario = false);

		[password].includes('')
			? (error.passwordUsuario = true)
			: (error.passwordUsuario = false);

		[repetirPassword].includes('')
			? (error.repetirPasswordUsuario = true)
			: (error.repetirPasswordUsuario = false);

		// VALIDACION DE IGUALDAD EN LOS CAMPOS DE PASSWORD
		password !== repetirPassword
			? (error.igualdadPassword = true)
			: (error.igualdadPassword = false);

		// VALIDACION DE LA LONGITUD DEL PASSWORD
		if (password.length < 6 || repetirPassword.length < 6) {
			error.longitudPassword = true;
		} else {
			error.longitudPassword = false;
		}

		setErrores(error);
	}, [nombre, email, password, repetirPassword]);
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

		// ENVIAR LOS DATOS
		try {
			const { data } = await axios.post(
				`${import.meta.env.VITE_BACK_URL}/api/usuarios`,
				{
					nombre,
					email,
					password,
				},
			);
			setAlerta({ msg: data.msg, error: false });
			setTimeout(() => {
				setErrores({
					nombreUsuario: false,
					emailUsuario: false,
					passwordUsuario: false,
					repetirPasswordUsuario: false,
					igualdadPassword: false,
					longitudPassword: false,
				});
				setSubmit(false);
				setNombre('');
				setEmail('');
				setPassword('');
				setRepetirPassword('');
				setAlerta({ msg: '', error: false });
			}, 3000);
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
				Crea tu cuenta y Administra tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta */}
			{![alerta.msg].includes('') ? (
				<Alerta mensaje={alerta.msg} error={alerta.error} />
			) : null}

			{/* Formulario */}
			<form className="my-10 shadow rounded-lg" onSubmit={handleSubmit}>
				{/* Nombre */}
				<Input
					dato={nombre}
					setDato={setNombre}
					placeholder="¿Pondrias tu Nombre?"
					label={'Nombre'}
					htmlFor={'nombre'}
					type={'text'}
					errores={errores.nombreUsuario}
					submit={submit}
					error={alerta}
				/>
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
					igualdad={errores.igualdadPassword}
					submit={submit}
					error={alerta}
				/>
				{/* Repetir Password */}
				<Input
					dato={repetirPassword}
					setDato={setRepetirPassword}
					placeholder="¿Pondrias tu Nueva Contraseña?"
					label={'Nueva Contraseña'}
					htmlFor={'password2'}
					type={'password'}
					errores={errores.repetirPasswordUsuario}
					igualdad={errores.igualdadPassword}
					submit={submit}
					error={alerta}
				/>

				{/* Boton Enviar */}
				<input
					className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 uppercase font-bold rounded-xl transition-colors duration-300"
					type="submit"
					value="Crear Cuenta"
				/>
				{errores.longitudPassword & submit ? (
					<p className="text-red-500 opacity-70 text-xs font-bold my-3">
						Aclaracion las contraseñas deben tener al menos 6
						caracteres
					</p>
				) : null}
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
