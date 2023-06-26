// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import PreviewProyecto from '../components/PreviewProyecto';
import Alerta from '../components/Alerta';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTOS) ---- //
export default function Proyectos() {
    // ---- CONTEXTs ---- //
    const { proyectos, alerta, error } = useProyectos();
    // ---- ---- ---- ---- //

    // ---- DATOS ---- //
    const { auth } = useAuth();
    // ---- ---- ---- //
    return (
        <div>
            {/* Titulo */}
            <h1 className="text-4xl font-black text-gray-500">Proyectos</h1>
            {/* Alerta */}
            <div className="mx-auto md:w-4/5 lg:w-3/4">
                {alerta.error & error ? <Alerta alerta={alerta} /> : null}
            </div>
            {/* Proyectos propios */}
            <div className="mx-auto md:w-4/5 lg:w-3/4 bg-[#0e0e0e] shadow mt-10 rounded-lg">
                <h2 className="text-2xl font-black text-gray-100">
                    Mis Proyectos
                </h2>
                <div>
                    {proyectos.map((proyecto) =>
                        proyecto.colaboradores.some(
                            (colaborador) =>
                                colaborador.toString() === auth._id.toString()
                        )
                    ) ? (
                        <p>Mis proyectos</p>
                    ) : null}
                </div>
            </div>
            <div className="mx-auto md:w-4/5 lg:w-3/4 bg-[#0e0e0e] shadow mt-10 rounded-lg">
                {proyectos.length ? (
                    proyectos.map((proyecto) => (
                        <PreviewProyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 font-bold uppercase text-center p-5">
                        No hay Proyectos
                    </p>
                )}
            </div>
        </div>
    );
}
// ---- ---- ---- ---- ---- ---- //
