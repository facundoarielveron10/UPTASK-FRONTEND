// ---- IMPORTACIONES ---- //
import { useContext } from 'react';
import ProyectosContext from '../context/ProyectosProvider';
// ---- ---- ---- ---- ---- //

// ---- HOOK (PROYECTOS) ---- //
const useProyectos = () => {
	return useContext(ProyectosContext);
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default useProyectos;
// ---- ---- ---- ---- ---- //
