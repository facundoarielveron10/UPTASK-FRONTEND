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
    const [cargando, setCargando] = useState(false);
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
                window.location.assign(`/proyectos/${proyecto.id}`);
            }, 4000);
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
                window.location.assign('/proyectos');
            }, 4000);
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
