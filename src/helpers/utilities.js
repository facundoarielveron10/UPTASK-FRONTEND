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

// ---- COMPARAR FECHA DEL TIPO YYYY-MM-DD ---- //
const compararFecha = (fecha) => {
    const fechaActual =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        new Date().getDate().toString().padStart(2, '0');
    const fechaEntrega = fecha?.split('T')[0];

    if (fechaEntrega > fechaActual) {
        return 1;
    } else if (fechaEntrega < fechaActual) {
        return 2;
    } else {
        return 3;
    }
};
// ---- ---- ---- ---- ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export { formatearFechaHora, formatearFecha, compararFecha };
// ---- ---- ---- ---- ---- //
