// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
// ---- ---- ---- ---- ---- //

// ---- HOOK (ADMIN) ---- //
const useAdmin = () => {
	// ---- CONTEXTs ---- //
	const { proyecto } = useProyectos();
	const { auth } = useAuth();
	// ---- ---- ---- ---- //

	return proyecto?.creador?._id === auth?._id;
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default useAdmin;
// ---- ---- ---- ---- ---- //
