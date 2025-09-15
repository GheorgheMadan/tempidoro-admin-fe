import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <ul className="nav-links">
                <li>
                    <NavLink to='/home'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add-product'>
                        Aggiungi un nuovo prodotto
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}