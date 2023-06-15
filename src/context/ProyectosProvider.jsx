// ---- IMPORTACIONES ---- //
import { set } from 'date-fns/esm';
import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/ClienteAxios';
import { useNavigate } from 'react-router-dom';
// ---- ---- ---- ---- ---- //

// ---- CONTEXTs (PROYECTOS) ---- //
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
    // ---- ESTADOS ---- //
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({ msg: '', error: false });
    const [creado, setCreado] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [modalTarea, setModalTarea] = useState(false);
    // ---- ---- ---- ---- //

    // ---- NAVIGATE ---- //
    const navigate = useNavigate();
    // ---- ---- ---- ---- //

    // ---- FUNCIONES ---- //
    const mostrarAlerta = (alerta) => {
        setAlerta(alerta);
    };

    const submitProyecto = async (proyecto) => {
        // ENVIAR DATOS A LA API
        if (proyecto.id) {
            await editarProyecto(proyecto);
        } else {
            await nuevoProyecto(proyecto);
        }
    };

    const editarProyecto = async (proyecto) => {
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
                config
            );

            // Sincronizamos el State
            const proyectosActualizados = proyectos.map((proyectoState) =>
                proyectoState._id === data._id ? data : proyectoState
            );
            setProyectos(proyectosActualizados);

            // Mostramos la alerta
            setCreado(true);

            setTimeout(() => {
                setCreado(false);
                setAlerta({ msg: '', error: false });
                navigate(`/proyectos/${proyecto.id}`);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    const nuevoProyecto = async (proyecto) => {
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
                config
            );
            setProyectos([...proyectos, data]);
            setCreado(true);

            setTimeout(() => {
                setCreado(false);
                setAlerta({ msg: '', error: false });
                navigate('/proyectos');
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    const obtenerProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            setCargando(true);
            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);
            setCargando(false);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarProyecto = async (id) => {
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
                config
            );

            // Sincronizar el state
            const proyectosActualizados = proyectos.filter(
                (proyectoState) => proyectoState._id !== id
            );
            setProyectos(proyectosActualizados);
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalTarea = () => {
        setModalTarea(!modalTarea);
    };

    const submitTarea = async (tarea) => {
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
            setCreado(true);

            setTimeout(() => {
                setCreado(false);
                setAlerta({ msg: '', error: false });
            }, 1500);
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
                creado,
                setCreado,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalTarea,
                handleModalTarea,
                submitTarea,
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
