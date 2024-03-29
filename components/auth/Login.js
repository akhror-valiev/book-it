import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { signIn } from "next-auth/react";
import ButtonLoader from "../layout/ButtonLoader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)



        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false)



        if (result.error) {
            toast.error(result.error);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email_field"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password_field"
                                className="form-control"
                            />
                        </div>

                        <Link href="/password/forgot" className="float-right mb-4">
                            Forgot Password?
                        </Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            {loading ? <ButtonLoader /> : "LOGIN"}
                        </button>

                        <Link href="/register" className="float-left mt-3">
                            New User?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
