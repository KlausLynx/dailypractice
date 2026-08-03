import { useLocation } from "react-router-dom"
export const Footer = () => {
    let location = useLocation()

    const formatpathname = (pathname) =>  {
        const formattedPathname = pathname === '/' ? 'Home' : pathname.replace(/^\//, '').replace(/-/g, ' ')
        return formattedPathname.charAt(0).toUpperCase() + formattedPathname.slice(1)
    }
    return (
        <p className="text-center text-sm text-gray-500 py-4">
            You are currently on <span className="font-medium text-gray-700">{formatpathname(location.pathname)}</span>
        </p>
    )
}