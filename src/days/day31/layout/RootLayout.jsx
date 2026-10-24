// Exercises (do these on your own)
// Build the setup above. Create pages Home, About, Dashboard, Settings, Login, and NotFound, with AuthProvider, ProtectedRoute, and RootLayout. Confirm that visiting /dashboard logged out sends you to /login, and that after logging in you land on /dashboard.
// Convert the guard to a loader. Rewrite the protection for /settings using loader: requireAuth instead of ProtectedRoute. After a redirect, make the login page read ?redirectTo= from the URL (use useSearchParams from Day 30).
// Smart 404. Add a route /products/:id with a list of 5 fake products. If the id doesn’t exist, show a “Product not found” message with a link back. Then visit /banana and confirm the generic 404 appears with your navbar still visible.
// Scroll lab. Make the Home page 3000px tall with a link at the bottom to /about. Click it and confirm you land at the top of About. Press Back and confirm you return to the bottom. Then remove <ScrollRestoration /> and compare the behavior.
// Prove the split. Run npm run build, list the chunk files, and note their sizes. Then temporarily change About to a normal static import, rebuild, and compare. Add a short comment in your code explaining what you observed.

// Bonus: Add a role to the user ("admin" or "user") and make a /admin route that only admins can see, with a “403 Forbidden” page for everyone else.
import { useNavigation, Outlet, ScrollRestoration } from "react-router"
import { Nav } from "../layout/Nav"
export const RootLayout = () => {
    const navigation = useNavigation()
    return(
        <>
            <Nav/>
            {navigation.state === "loading" &&  <p>Loading....</p>}
            <Outlet/>
            <ScrollRestoration/>
        </>
    )
}