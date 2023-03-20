// ---- IMPORTACIONES ---- //
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineAccountCircle } from 'react-icons/md';
// ---- ---- ---- ---- ---- //

// ---- COMPONENTE (Menu) ---- //
export default function Menu() {
	return (
		<div className="fixed bottom-0 w-1/2 md:w-1/4 lg:w-1/6 bg-[#090909] border-[3px] border-sky-600 hover:border-teal-500 transition-colors duration-300 rounded-2xl p-4 mb-10 shadow-2xl">
			<div className="flex justify-between">
				<Link
					className="text-sky-600 hover:text-teal-500 transition-colors duration-300"
					to="crear-proyecto"
				>
					<AiOutlinePlus fontSize={35} />
				</Link>
				<Link
					className="text-sky-600 hover:text-teal-500 transition-colors duration-300"
					to="crear-proyecto"
				>
					<CiEdit fontSize={35} />
				</Link>
			</div>
		</div>
	);
}
// ---- ---- ---- ---- ---- ---- //
