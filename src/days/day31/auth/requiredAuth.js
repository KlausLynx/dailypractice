import { redirect } from "react-router";

export const loader = ({request}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
        const url = new URL(request.url)
        return redirect(`/login?redirectTo=${url.pathname}`)
    }
    return user
}