import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";
import { signOut } from "next-auth/react";

const Header = () => {
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);


    const logoutHandler = () => {
        signOut()
    }

    return (
        <nav className="navbar row justify-content-center sticky-top">
            <div className="container">
                <div className="col-3 p-0">
                    <div className="navbar-brand">
                        <Link href="/">
                            <Image
                                style={{ cursor: "pointer" }}
                                src="/images/bookit_logo.png"
                                alt="BookIT"
                                height="40"
                                width="120"
                            />
                        </Link>
                    </div>
                </div>

                <div className="col-3 mt-3 mt-md-0 text-center">
                    {user ? (
                        <div className="ml-4 dropdown d-line">
                            <a
                                href=""
                                className="btn dropdown-toggle mr-4"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <figure className="avatar avatar-nav">
                                    <img
                                        className="rounded-circle"
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropDownMenuButton"
                            >
                                <Link href="/bookings/me">
                                    <span className="dropdown-item">My booking</span>
                                </Link>
                                <Link href="/me/update">
                                    <span className="dropdown-item">Profile</span>
                                </Link>
                                <Link href="/">
                                    <span onClick={logoutHandler} className="dropdown-item text-danger">Logout</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        !loading && (
                            <Link href="/login">
                                <span className="btn btn-danger px-4 text-white login-header-btn float-right">
                                    Login
                                </span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
