// ---- IMPORTACIONES ---- //
import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Proyectos from './pages/Proyectos';
import RutaProtegida from './layouts/RutaProtegida';
import NuevoProyecto from './pages/NuevoProyecto';
import Proyecto from './pages/Proyecto';
import EditarProyecto from './pages/EditarProyecto';
import Instrucciones from './pages/Instrucciones';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (APLICACION PRINCIPAL) ---- //
function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProyectosProvider>
					{/* RUTAS */}
					<Routes>
						{/* AREA PUBLICA */}
						<Route path="/" element={<AuthLayout />}>
							{/* INICIO DE SESION */}
							<Route index element={<Login />} />
							{/* REGISTRARSE */}
							<Route path="registrar" element={<Registrar />} />
							{/* INSTRUCCIONES */}
							<Route
								path="instrucciones"
								element={<Instrucciones />}
							/>
							{/* OLVIDE MI PASSWORD */}
							<Route
								path="olvide-password"
								element={<OlvidePassword />}
							/>
							{/* REESTABLECER PASSWORD */}
							<Route
								path="olvide-password/:token"
								element={<NuevoPassword />}
							/>
							{/* CONFIRMAR CUENTA */}
							<Route
								path="confirmar/:id"
								element={<ConfirmarCuenta />}
							/>
						</Route>

						{/* AREA PRIVADA */}
						<Route path="/proyectos" element={<RutaProtegida />}>
							<Route index element={<Proyectos />} />
							<Route
								path="crear-proyecto"
								element={<NuevoProyecto />}
							/>
							<Route path=":id" element={<Proyecto />} />
							<Route
								path="editar/:id"
								element={<EditarProyecto />}
							/>
						</Route>
					</Routes>
				</ProyectosProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}
// ---- ---- ---- ---- ---- //

// ---- EXPORTACIONES ---- //
export default App;
// ---- ---- ---- ---- ---- //
