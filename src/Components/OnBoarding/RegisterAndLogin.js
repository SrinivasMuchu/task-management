import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Constants";
import './RegisterAndLogin.css'


function RegisterAndLogin({ type }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        gender: "",
    });

    const toastStyle = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const verifyMember = async (token) => {
        try {
            const response = await axios.post(
                BASE_URL + "/member/verify-member",
                {},
                {
                    headers: {
                        "x-auth-token": `${token}`,
                    },
                }
            );

            if (response.data.meta.success) {
                Cookies.set("user_token", token);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === "register") {
                const registerResponse = await axios.post(BASE_URL + "/member/register", {
                    full_name: formData.name,
                    email: formData.email,
                    phone_number: formData.phoneNumber,
                    password: formData.password,
                    gender: formData.gender,
                })
                if (registerResponse.data.meta.success !== true) {
                    toast.error(registerResponse.data.meta.message, toastStyle)
                }
                console.log("Registering:", registerResponse);
            } else if (type === "login") {
                const loginResponse = await axios.post(BASE_URL + '/member/login', {
                    email: formData.email, password: formData.password
                });
                if (loginResponse.data.meta.success !== true) {
                    toast.error(loginResponse.data.meta.message, toastStyle)
                }
                const token = loginResponse.data.data.user_token;
                if (token) {
                    verifyMember(token)
                }
                console.log("Logging in:", loginResponse);
            }
        } catch (error) {
            console.log('something went wrong!', error)
        }

    };

    return (
        <div className="onboard-page">
            <div className="onboard-page-cont">
                <div className="onboard-logo">
                    <img src='https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727481600&semt=ais_hybrid' alt='logo' />
                </div>

                <form onSubmit={handleSubmit} className="onboard-form">
                    {type === "register" && (
                        <div className="onboard-input-cont">
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    {type === "register" && (
                        <div className="onboard-input-cont">
                            <span>Phone number</span>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div className="onboard-input-cont">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="onboard-input-cont">
                        <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {type === "register" && (
                        <div className="onboard-input-cont">
                            <span>Confirm password</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {type === "register" && (
                        <div className="onboard-input-cont">
                            <span>Gender</span>
                            <div className="onboard-radio-buttons">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={formData.gender === "Other"}
                                        onChange={handleChange}
                                    />
                                    Other
                                </label>
                            </div>
                        </div>
                    )}

                    <div>
                        <button type="submit">
                            {type === "register" ? "Signup" : "Login"}
                        </button>
                    </div>

                    <div>
                        {type === "register" ? (
                            <span>
                                Already registered? Please <a href="/login">Login</a>
                            </span>
                        ) : (
                            <span>
                                Don't have an account? <a href="/signup">Signup</a>
                            </span>
                        )}
                    </div>
                </form>
            </div>

        </div>
    );
}

export default RegisterAndLogin;