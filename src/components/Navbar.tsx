import { Link } from "react-router-dom";

const navItems: {
    name: string,
    href: string
}[] = [
        {
            name: "Home",
            href: "/home"
        },
        {
            name: "Signup",
            href: "/signup"
        }
    ];


const Navbar = () => {
    return (
        <nav>
            <div className="h-20 flex justify-end items-center border-b-2">
                <div className="flex justify-end items-center mx-5 my-5 md:mx-20 gap-2">
                    {navItems.map((n) => (
                        <Link to={n.href} className={`text-xl font-semibold px-5 py-2 transition rounded-md ${(n.href=='/signup')?'bg-black text-white hover:text-gray-200 hover:bg-gray-800':'hover:text-blue-700'}`}>{n.name}</Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar