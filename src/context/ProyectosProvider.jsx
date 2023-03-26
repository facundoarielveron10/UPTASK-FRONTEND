// ---- IMPORTACIONES ---- //
import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/ClienteAxios';
// ---- ---- ---- ---- ---- //

// ---- CONTEXTs (PROYECTOS) ---- //
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	// ---- FUNCIONES ---- //
	const submitProyecto = async proyecto => {
		// ENVIAR DATOS A LA API
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				'/proyectos',
				proyecto,
				config,
			);
			setAlerta({ msg: 'Proyecto creado correctamente', error: false });
			setCreado(true);
		} catch (error) {
			console.log(error);
		}
	};

	const proyectosUsuario = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			// TRAER TODOS LOS PROYECTOS DEL USUARIO
			const { data } = await clienteAxios.get('/proyectos', config);
			setProyectos(data);
		} catch (error) {
			console.log(error);
		}
	};
	// ---- ---- ---- ---- //

	// ---- ESTADOS ---- //
	const [proyectos, setProyectos] = useState(proyectosUsuario());
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const [creado, setCreado] = useState(false);
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		proyectosUsuario();
	}, []);
	// ---- ---- ---- ---- //

	return (
		<ProyectosContext.Provider
			value={{
				proyectos,
				alerta,
				setAlerta,
				submitProyecto,
				creado,
				setCreado,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export { ProyectosProvider };

export default ProyectosContext;
// ---- ---- ---- ---- ---- //
