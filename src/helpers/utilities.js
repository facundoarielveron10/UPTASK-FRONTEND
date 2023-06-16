import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ---- FORMATEAR FECHA CON HORA ---- //
const formatearFechaHora = (fecha) => {
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

// ---- FORMATEAR FECHA ---- //
const formatearFecha = (fecha) => {
    if (fecha) {
        const date = new Date(fecha.split('T')[0].split('-'));
        const fechaFormateada = format(date, "'El' dd 'de' MMMM 'del' yyyy", {
            locale: es,
        });
        return fechaFormateada;
    }
};
// ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export { formatearFechaHora, formatearFecha };
// ---- ---- ---- ---- ---- //
