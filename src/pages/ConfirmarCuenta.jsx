// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (CONFIRMAR CUENTA) ---- //
export default function ConfirmarCuenta() {
	// ---- ESTADOS ---- //
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
	// ---- ---- ---- ---- //

	// ---- TOKEN (URL) ---- //
	const params = useParams();
	const { id } = params;
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		const confirmarCuenta = async () => {
			try {
				const url = `${
					import.meta.env.VITE_BACK_URL
				}/api/usuarios/confirmar/${id}`;
				const { data } = await axios(url);
				setAlerta({ msg: data.msg, error: false });
				setCuentaConfirmada(true);
			} catch (error) {
				setAlerta({ msg: error.response.data.msg, error: true });
			}
		};

		return () => {
			confirmarCuenta();
		};
	}, []);
	// ---- ---- ---- ---- //

	return (
		<>
			{/* Informacion */}
			<h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
				Confirma tu cuenta y Comienza a crear tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{/* Alerta */}
			{![alerta.msg].includes('') ? (
				<Alerta mensaje={alerta.msg} error={alerta.error} />
			) : null}

			{/* BOTON INICIAR SESION */}
			{cuentaConfirmada && (
				<Link
					className="flex justify-center m-6 uppercase font-bold text-gray-50 bg-sky-600 border-[3px] border-sky-700 hover:bg-sky-700 hover:border-sky-800 transition-colors duration-300 rounded-lg p-3"
					to="/"
				>
					Iniciar Sesion
				</Link>
			)}
		</>
	);
}
// ---- ---- ---- ---- ---- //
