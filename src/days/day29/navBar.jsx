import { NavLink } from "react-router-dom"
export const Navbar = () => {


    return (
    <>
        <style>{`
            .nav-link {
                position: relative;
                color: blue;
                text-decoration: none;
            }
            .nav-link::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -2px;
                width: 100%;
                height: 1px;
                background: red;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.5s;
            }
            .nav-link.active::after {
                transform: scaleX(1);
            }
        `}</style>
        <nav className="bg-white shadow-sm px-6 py-4">
            <ul className="flex gap-8 justify-center">
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/services" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
                </li>
                <li>
                    <NavLink to="/portfolio" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Portfolio</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
                </li>
            </ul>
        </nav>
    </>
)
}