// ---- IMPORTACIONES ---- //
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';
import Input from '../components/Input';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (FORMULARIO CREACION DE PROYECTOS) ---- //
export default function FormularioProyecto() {
	// ---- CONTEXTs ---- //
	const { alerta, submitProyecto, setAlerta, creado, setCreado } =
		useProyectos();
	// ---- ---- ---- ---- //

	// ---- NAVEGACION ---- //
	const navigate = useNavigate();
	// ---- ---- ---- ---- //

	// ---- ESTADOS ---- //
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');
	const [submit, setSubmit] = useState(false);
	const [errores, setErrores] = useState({
		nombreFormulario: false,
		descripcionFormulario: false,
		fechaEntregaFormulario: false,
		clienteFormulario: false,
	});
	// ---- ---- ---- ---- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		// ERRORES DE VALIDACION
		const error = {
			nombreFormulario: false,
			descripcionFormulario: false,
			fechaEntregaFormulario: false,
			clienteFormulario: false,
		};

		// VALIDACIONES DE CAMPOS REQUERIDO
		[nombre].includes('') & !creado
			? (error.nombreFormulario = true)
			: (error.nombreFormulario = false);

		[descripcion].includes('') & !creado
			? (error.descripcionFormulario = true)
			: (error.descripcionFormulario = false);

		[fechaEntrega].includes('') & !creado
			? (error.fechaEntregaFormulario = true)
			: (error.fechaEntregaFormulario = false);

		[cliente].includes('') & !creado
			? (error.clienteFormulario = true)
			: (error.clienteFormulario = false);

		setErrores(error);
	}, [nombre, descripcion, fechaEntrega, cliente]);
	// ---- ---- ---- ---- //

	// ---- ---- ---- ---- //

	// ---- FUNCIONES ---- //
	const handleSubmit = async e => {
		// VALIDACION DEL FORMULARIO
		e.preventDefault();
		setSubmit(true);

		// VERIFICAMOS QUE NO HAYA ERRORES
		let errorUsuario = false;
		Object.values(errores).map(error => {
			if (error === true) {
				errorUsuario = true;
			}
		});
		if (errorUsuario) {
			return;
		}

		// PASAR DATOS AL PROVIDER
		await submitProyecto({ nombre, descripcion, fechaEntrega, cliente });

		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setCliente('');

		setTimeout(() => {
			setSubmit(false);
			setAlerta({ msg: '', error: false });
			setCreado(false);
			navigate('/proyectos');
		}, 4000);
	};
	// ---- ---- ---- ---- //

	return (
		<div className="flex flex-col gap-8 justify-center items-center w-full">
			{/* Alerta */}
			{![alerta.msg].includes('') ? (
				<Alerta mensaje={alerta.msg} error={alerta.error} />
			) : null}

			<form
				className="bg-[#0e0e0e] border border-[#080808] shadow-2xl shadow-[#080808] py-10 px-5 w-full md:w-2/3 xl:w-1/2 rounded-lg"
				onSubmit={handleSubmit}
			>
				{/* Nombre */}
				<Input
					dato={nombre}
					setDato={setNombre}
					placeholder="Nombre del Proyecto"
					label={'Nombre'}
					htmlFor={'nombre'}
					type={'text'}
					errores={errores.nombreFormulario}
					submit={submit}
					error={alerta}
				/>
				{/* Desceripcion */}
				<Input
					dato={descripcion}
					setDato={setDescripcion}
					placeholder="Descripcion del Proyecto"
					label={'Descripcion'}
					htmlFor={'descripcion'}
					type={'text'}
					errores={errores.descripcionFormulario}
					submit={submit}
					error={alerta}
				/>
				{/* Fecha Entrega */}
				<Input
					dato={fechaEntrega}
					setDato={setFechaEntrega}
					placeholder="Fecha de Entrega del Proyecto"
					label={'Fecha de Entrega'}
					htmlFor={'fecha-entrega'}
					type={'date'}
					errores={errores.fechaEntregaFormulario}
					submit={submit}
					error={alerta}
				/>
				{/* Cliente */}
				<Input
					dato={cliente}
					setDato={setCliente}
					placeholder="Cliente del Proyecto"
					label={'Cliente'}
					htmlFor={'cliente'}
					type={'text'}
					errores={errores.clienteFormulario}
					submit={submit}
					error={alerta}
				/>

				{/* Boton Enviar */}
				<input
					className="bg-sky-700 hover:bg-teal-500 cursor-pointer text-gray-50 w-full py-3 mt-3 uppercase font-bold rounded-xl transition-colors duration-300"
					type="submit"
					value="Crear Proyecto"
				/>
			</form>
		</div>
	);
}
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- //
