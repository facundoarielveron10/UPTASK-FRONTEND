// ---- IMPORTACIONES ---- //
import { set } from 'date-fns/esm';
import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/ClienteAxios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// ---- ---- ---- ---- ---- //

// ---- CONTEXTs (PROYECTOS) ---- //
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	// ---- ESTADOS ---- //
	const [proyectos, setProyectos] = useState([]);
	const [proyecto, setProyecto] = useState({});
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const [exito, setExito] = useState(false);
	const [error, setError] = useState(false);
	const [cargando, setCargando] = useState(false);
	const [modalTarea, setModalTarea] = useState(false);
	const [tarea, setTarea] = useState({});
	const [colaborador, setColaborador] = useState({});
	// ---- ---- ---- ---- //

	// ---- SWEET ALERTA ---- //
	const EliminarProyecto = withReactContent(Swal);
	const EliminarTarea = withReactContent(Swal);
	const EliminarColaborador = withReactContent(Swal);
	// ---- ---- ---- ---- ---- //

	// ---- NAVIGATE ---- //
	const navigate = useNavigate();
	// ---- ---- ---- ---- //

	// ---- FUNCIONES ---- //
	const mostrarAlerta = alerta => {
		setAlerta(alerta);
	};

	const submitProyecto = async proyecto => {
		// ENVIAR DATOS A LA API
		if (proyecto?.id) {
			await editarProyecto(proyecto);
		} else {
			await nuevoProyecto(proyecto);
		}
	};

	const editarProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.put(
				`/proyectos/${proyecto.id}`,
				proyecto,
				config,
			);

			// Sincronizamos el State
			const proyectosActualizados = proyectos.map(proyectoState =>
				proyectoState._id === data._id ? data : proyectoState,
			);
			setProyectos(proyectosActualizados);

			// Mostramos la alerta
			setExito(true);

			setTimeout(() => {
				setExito(false);
				setAlerta({ msg: '', error: false });
				navigate(`/proyectos/${proyecto.id}`);
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	const nuevoProyecto = async proyecto => {
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
			setExito(true);

			setTimeout(() => {
				setExito(false);
				setAlerta({ msg: '', error: false });
				navigate('/proyectos');
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	const obtenerProyecto = async id => {
		setCargando(true);
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
			setAlerta({ msg: '', error: false });
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true });
			setError(true);
		} finally {
			setCargando(false);
		}
	};

	const handleDeleteProyecto = async (id, nombre) => {
		await EliminarProyecto.fire({
			title: '¿ESTAS SEGURO?',
			text: `ELIMINAR EL PROYECTO: ${nombre.toUpperCase()}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0ea5e9',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, ELIMINAR!',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire(
					'ELIMINADO!',
					`EL PROYECTO "${nombre.toUpperCase()}" FUE ELIMINADO`,
					'success',
				).then(async result => {
					if (result.isConfirmed) {
						await eliminarProyecto(id);
					}
				});
			}
		});
	};

	const eliminarProyecto = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.delete(
				`/proyectos/${id}`,
				config,
			);

			// Sincronizar el state
			const proyectosActualizados = proyectos.filter(
				proyectoState => proyectoState._id !== id,
			);
			setProyectos(proyectosActualizados);
			navigate('/proyectos');
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalTarea = () => {
		setModalTarea(!modalTarea);
		setTarea({});
		setAlerta({ msg: '', error: false });
	};

	const submitTarea = async tarea => {
		if (tarea?.idTarea) {
			await editarTarea(tarea);
		} else {
			await nuevaTarea(tarea);
		}
	};

	const editarTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.put(
				`/tareas/${tarea.idTarea}`,
				tarea,
				config,
			);

			// Sincronizamos el State
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyectoActualizado.tareas.map(
				tareaState => (tareaState._id === data._id ? data : tareaState),
			);

			setProyecto(proyectoActualizado);

			setExito(true);

			setTimeout(() => {
				setExito(false);
				setAlerta({ msg: '', error: false });
				setModalTarea(false);
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	const nuevaTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post('/tareas', tarea, config);

			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = [...proyecto.tareas, data];

			setProyecto(proyectoActualizado);

			setExito(true);

			setTimeout(() => {
				setExito(false);
				setAlerta({ msg: '', error: false });
				setModalTarea(false);
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditarTarea = tarea => {
		setTarea(tarea);
		setModalTarea(true);
	};

	const handleDeleteTarea = async (id, nombre) => {
		await EliminarTarea.fire({
			title: '¿ESTAS SEGURO?',
			text: `ELIMINAR LA TAREA: ${nombre.toUpperCase()}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0ea5e9',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, ELIMINAR!',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire(
					'ELIMINADO!',
					`LA TAREA "${nombre.toUpperCase()}" FUE ELIMINADA`,
					'success',
				).then(async result => {
					if (result.isConfirmed) {
						await eliminarTarea(id);
					}
				});
			}
		});
	};

	const eliminarTarea = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.delete(`/tareas/${id}`, config);

			// Sincronizamos el State
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
				tareaState => tareaState._id !== id,
			);

			setProyecto(proyectoActualizado);
			setTarea({});
		} catch (error) {
			console.log(error);
		}
	};

	const submitColaborador = async email => {
		setCargando(true);
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
				'/proyectos/colaboradores',
				{ email },
				config,
			);
			setError(false);
			setExito(true);
			setColaborador(data);
			setAlerta({ msg: '', error: '' });
			// RESETEAMOS TODOS LOS STATES
			setTimeout(() => {
				setError(false);
				setExito(false);
			}, 1500);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			setExito(false);
			setError(true);
		} finally {
			setCargando(false);
		}
	};

	const agregarColaborador = async email => {
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
				`/proyectos/colaboradores/${proyecto._id}`,
				email,
				config,
			);

			setAlerta({
				msg: data.msg,
				exito: true,
			});
			setColaborador({});
			setExito(true);
			setError(false);
			setTimeout(() => {
				setExito(false);
				setError(false);
				setAlerta({ msg: '', exito: false });
			}, 3000);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			setExito(false);
			setError(true);
		}
	};

	const handleDeleteColaborador = async (id, nombre, proyecto) => {
		await EliminarColaborador.fire({
			title: '¿ESTAS SEGURO?',
			text: `ELIMINAR EL COLABORADOR: ${nombre.toUpperCase()}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0ea5e9',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, ELIMINAR!',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire(
					'ELIMINADO!',
					`EL COLABORADOR "${nombre.toUpperCase()}" FUE ELIMINADO`,
					'success',
				).then(async result => {
					if (result.isConfirmed) {
						await eliminarColaborador(id, proyecto);
					}
				});
			}
		});
	};

	const eliminarColaborador = async (id, idProyecto) => {
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
				`/proyectos/eliminar-colaborador/${id}`,
				{ id: idProyecto },
				config,
			);

			// Sincronizamos el State
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.colaboradores =
				proyectoActualizado.colaboradores.filter(
					colaboradorState => colaboradorState._id !== id,
				);
			setProyecto(proyectoActualizado);
			setColaborador({});
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
				mostrarAlerta,
				alerta,
				setAlerta,
				submitProyecto,
				exito,
				setExito,
				obtenerProyecto,
				proyecto,
				cargando,
				handleDeleteProyecto,
				modalTarea,
				handleModalTarea,
				submitTarea,
				handleEditarTarea,
				tarea,
				handleDeleteTarea,
				submitColaborador,
				error,
				colaborador,
				agregarColaborador,
				handleDeleteColaborador,
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
