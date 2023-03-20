// ---- IMPORTACIONES ---- //
import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/ClienteAxios';
// ---- ---- ---- ---- ---- //

// ---- CONTEXTs (PROYECTOS) ---- //
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	// ---- ESTADOS ---- //
	const [proyectos, setProyectos] = useState([]);
	// ---- ---- ---- ---- //

	return (
		<ProyectosContext.Provider value={{ proyectos }}>
			{children}
		</ProyectosContext.Provider>
	);
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export { ProyectosProvider };

export default ProyectosContext;
// ---- ---- ---- ---- ---- //
