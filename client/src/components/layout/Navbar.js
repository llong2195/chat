import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/logout', {
                credentials: 'include'
            })
            const data = await res.json();
            console.log('logout', data);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <nav className="">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Logo</a>
                    <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                        <li><a onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
                <li><a onClick={logout}>Logout</a></li>
            </ul>
        </>
    )
}

export default Navbar