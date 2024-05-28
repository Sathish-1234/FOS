import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import Swal from 'sweetalert2';
import TopNavbar from './TopNavbar';

function Login() {
    const [mail, setMail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin@123");
 
    const checkuser = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_FOS_API}/checkadmin`, { mail, password })
            .then((res => {
                if (res.data > 0) {
                    localStorage.setItem('fosadminsecretsID', res.data);
                    window.location.reload();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong username or password!',
                    });
                }
            }))
    }

    return (
        <div className=''>
            <TopNavbar/>
            <section className="mt-4 d-flex justify-content-center w-100">
                <div className="bg-white" style={{width:'350px'}} >
                    <form onSubmit={checkuser}>
                        <h3 className="text-center">LOG IN</h3>
                        <div className="form-group my-3">
                            <label htmlFor="email" >Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={mail}
                                id="email"
                                onChange={(e) => setMail(e.target.value)}
                                placeholder="Enter email or phone number"
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary my-3">
                                LOG IN
                            </button>
                            <div>
                                <Link to="/forgettenpassword">Forgot Password?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
