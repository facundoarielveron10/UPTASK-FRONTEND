// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../config/ClienteAxios';
import Alerta from '../components/Alerta';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (NUEVO PASSWORD) ---- //
export default function NuevoPassword() {
	// ---- ESTADOS ---- //
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const [errores, setErrores] = useState({
		passwordUsuario: false,
		repetirPasswordUsuario: false,
		igualdadPassword: false,
		longitudPassword: false,
	});
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const [tokenValido, setTokenValido] = useState(false);
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
				setAlerta({ msg: error.response.data.msg, error: true });
			}
		};

		return () => {
			comprobarToken();
		};
	}, []);

	useEffect(() => {
		// ERRORES DE VALIDACION
		const error = {
			passwordUsuario: false,
			repetirPasswordUsuario: false,
			igualdadPassword: false,
			longitudPassword: false,
		};

		// VALIDACIONES DE CAMPOS REQUERIDO
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
	}, [password, repetirPassword]);
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
			const { data } = await clienteAxios.post(
				`/usuarios/olvide-password/${token}`,
				{
					password,
				},
			);
			setAlerta({ msg: data.msg, error: false });
			setTimeout(() => {
				window.location = '/';
			}, 4000);
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
				Reestablece tu contraseña y no pierdas acceso a tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta */}
			{![alerta.msg].includes('') ? (
				<Alerta mensaje={alerta.msg} error={alerta.error} />
			) : null}

			{/* Formulario */}
			{tokenValido ? (
				<form
					className="my-10 shadow rounded-lg"
					onSubmit={handleSubmit}
				>
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
						value="Guardar nuevo password"
					/>
					{errores.longitudPassword & submit ? (
						<p className="text-red-500 opacity-70 text-xs font-bold my-3">
							Aclaracion las contraseñas deben tener al menos 6
							caracteres
						</p>
					) : null}
				</form>
			) : null}
		</>
	);
}
// ---- ---- ---- ---- ---- //
