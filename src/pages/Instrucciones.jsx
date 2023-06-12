export default function Instrucciones() {
	return (
		<>
			{/* Informacion */}
			<h1 className="text-sky-600 hover:text-teal-500 transition-colors duration-300 font-black text-4xl md:text-5xl lg:text-6xl capitalize select-none">
				Hemos enviado instrucciones a tu{' '}
				<span className="text-slate-700">email</span>
			</h1>

			<div className="bg-gradient-to-br from-sky-500 to-sky-600 text-center p-2 rounded-xl uppercase text-white font-black sm:text-sm text-xs mt-10">
				Hemos enviado instrucciones a tu email
			</div>
		</>
	);
}
