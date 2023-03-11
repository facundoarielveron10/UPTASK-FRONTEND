// ---- IMPORTACIONES ---- //
import axios from 'axios';
// ---- ---- ---- ---- ---- //

// ---- CLIENTE AXIOS ---- //
const clienteAxios = axios.create({
	baseURL: `${import.meta.env.VITE_BACK_URL}/api`,
});
// ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default clienteAxios;
// ---- ---- ---- ---- ---- //
