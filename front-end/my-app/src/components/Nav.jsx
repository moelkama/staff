import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
    return (
        <nav className="border-b border-gray-300 text-white py-4">
            <div className="container mx-auto flex items-center px-4">
                <img className="h-16 w-16" src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg" alt="Logo"></img>
                <div className="flex-1 flex justify-center items-center">
                    <ul className="flex gap-8">
                        <a href="/find_order/LAST_WEEK" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </a>
                        <a href="/create" className="text-xl text-black flex justify-center items-center h-10 w-24 bg-green-400 rounded-md transition duration-700 ease-in-out hover:bg-transparent border hover:border-slate-800">
                            <FontAwesomeIcon icon={faCashRegister} />
                        </a>
                    </ul>
                </div>
            </div>
        </nav>
    );
}