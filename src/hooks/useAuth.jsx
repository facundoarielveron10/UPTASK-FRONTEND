// ---- IMPORTACIONES ---- //
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
// ---- ---- ---- ---- ---- //

// ---- HOOK (AUTENTICACION) ---- //
const useAuth = () => {
	return useContext(AuthContext);
};
// ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default useAuth;
// ---- ---- ---- ---- ---- //
