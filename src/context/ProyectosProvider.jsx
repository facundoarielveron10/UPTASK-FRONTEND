// ---- IMPORTACIONES ---- //
import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/ClienteAxios';
// ---- ---- ---- ---- ---- //

// ---- CONTEXTs (PROYECTOS) ---- //
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	// ---- ESTADOS ---- //
	const [proyectos, setProyectos] = useState([]);
	const [proyecto, setProyecto] = useState({});
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const [creado, setCreado] = useState(false);
	// ---- ---- ---- ---- //

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
			setProyectos([...proyectos, data]);
			setAlerta({ msg: 'Proyecto creado correctamente', error: false });
			setCreado(true);
		} catch (error) {
			console.log(error);
		}
	};

	const obtenerProyecto = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios(`/proyectos/${id}`, config);
			setProyecto(data);
		} catch (error) {
			console.log(error);
		}
	};
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
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

		return () => {
			proyectosUsuario();
		};
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
				obtenerProyecto,
				proyecto,
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
