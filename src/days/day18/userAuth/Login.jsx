import { useContext} from "react";
import { useForm } from "react-hook-form";
import AuthContext from "./AuthContext";

function Login() {
    const { login } = useContext(AuthContext);

    const { register, formState:{ errors, isSubmitting }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        login(data.username);
    };

    return (
        <div>
            <h2 className="font-bold">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" {...register('username', {required: 'Username is required'})} />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" {...register('password', {required: 'Password is required'})} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );

}

export default Login;