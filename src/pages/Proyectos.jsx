// ---- IMPORTACIONES ---- //
import useProyectos from '../hooks/useProyectos';
import PreviewProyecto from '../components/PreviewProyecto';
// ---- ---- ---- ---- ---- //

// ---- PAGINA (PROYECTOS) ---- //
export default function Proyectos() {
    // ---- CONTEXTs ---- //
    const { proyectos } = useProyectos();
    // ---- ---- ---- ---- //

    return (
        <div>
            <h1 className="text-4xl font-black text-gray-500">Proyectos</h1>

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
