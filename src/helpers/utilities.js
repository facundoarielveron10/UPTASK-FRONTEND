import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ---- FORMATEAR FECHA ---- //
const formatearFecha = (fecha) => {
    if (fecha) {
        const date = new Date(fecha);
        const fechaFormateada = format(
            date,
            "'el' dd 'de' MMMM 'del' yyyy 'a las' HH:mm:ss",
            { locale: es }
        );
        return fechaFormateada;
    }
};
// ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export { formatearFecha };
// ---- ---- ---- ---- ---- //
