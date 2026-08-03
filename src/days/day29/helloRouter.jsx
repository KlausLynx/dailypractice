import { NavLink } from "react-router-dom"
export const Greeting = () => {
    return (
        <>
            <h1>Hello, World!</h1>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>
        </>
    )
}