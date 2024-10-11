import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { BASE_URL } from '../../Constants';

function EditDetails({ type }) {
    const [selectedSection, setSelectedSection] = useState('general');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: '',
    });
    const handleSectionClick = (section) => {
        setSelectedSection(section);
        // navigate(`/settings?tab=${section}`);
    };
    const nav = useNavigate()
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

    const memberDetails = async (action) => {
        try {
            const headers = {
                "x-auth-token": Cookies.get('user_token'),
            };
            const memberDetails = await axios.post(
                BASE_URL + "/member/edit-details",
                { action: action },
                { headers }
            );
            if (memberDetails.data.meta.success !== true) {
                toast.error(memberDetails.data.meta.message, toastStyle)
            }
            console.log('member details edited', memberDetails);

        } catch (error) {
            console.log('something went wrong!', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'edit') {
                const headers = {
                    "x-auth-token": Cookies.get('user_token'),
                };
                const profileData = {
                    name: formData.name,
                    phone: formData.phoneNumber,
                    gender: formData.gender,
                    action: 'update'
                };
                const editDetails = await axios.post(
                    BASE_URL + "/member/edit-details",
                    profileData,
                    { headers }
                );
                if (editDetails.data.meta.success !== true) {
                    toast.error(editDetails.data.meta.message, toastStyle)
                }
                console.log('member details edited', editDetails);
            } else if (type === 'password') {
                const headers = {
                    "x-auth-token": Cookies.get('user_token'),
                };
                const passwordData = {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.password,
                    confirmNewPassword: formData.confirmPassword,
                };
                const editPassword = await axios.post(
                    BASE_URL + "/member/change-password",
                    passwordData,
                    { headers }
                );
                if (editPassword.data.meta.success !== true) {
                    toast.error(editPassword.data.meta.message, toastStyle)
                }
                console.log('change password', editPassword);
            }
        } catch (error) {
            console.log('something went wrong!', error)
        }


    };
    return (

        <div className="setting-container">

            <div className="setting-heading">
                <span>SETTINGS</span>
            </div>
            <div className='setting-navs'>
                <div
                    className={`generals${selectedSection === 'general' ? ' settingActive' : ''}`}
                    onClick={() => handleSectionClick('general')}
                    style={{
                        cursor: 'pointer',
                        boxShadow: selectedSection === 'general' ? '0px 3px 0px 0px #FF7A7A' : 'none',
                        padding: '10px 16px',
                        color: selectedSection === 'general' ? '#FF7A7A' : 'black'
                    }}
                >
                    Profile
                </div>


                <div
                    className={`privacys${selectedSection === 'privacy' ? ' settingActive' : ''}`}
                    onClick={() => handleSectionClick('privacy')}
                    style={{
                        cursor: 'pointer',
                        boxShadow: selectedSection === 'privacy' ? '0px 3px 0px 0px #FF7A7A' : 'none',
                        padding: '10px 16px',
                        color: selectedSection === 'privacy' ? '#FF7A7A' : 'black'
                    }}
                >
                    Change password
                </div>
            </div>
            {selectedSection === 'general' && <>
                <div className="setting-img">
                    <img
                        src="https://cdn-icons-png.freepik.com/256/3984/3984678.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
                        alt="Profile"
                    />
                </div>

                <div className="setting-input">
                    <div className="login-signup-input">
                        <span>Full Name</span>
                        <input
                            type="text"
                            name="fullName"
                        // value={formData.fullName}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="login-signup-input">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="login-signup-input">
                        <span>Phone Number</span>
                        <input
                            type="number"
                            name="phoneNumber"
                        // value={formData.phoneNumber}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="login-signup-input-radio">
                        <span>Gender</span>
                        <div className="login-signup-gender">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                // checked={formData.gender === "Male"}
                                // onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                // value="Female"
                                // checked={formData.gender === "Female"}
                                // onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                </div>

                <div className="setting-save-btn">
                    <button
                    // onClick={handleSave}
                    >Save</button>
                </div>
            </>}
            {selectedSection === 'privacy' && <>
              

                <div className="setting-input">
                    <div className="login-signup-input">
                        <span>Old password</span>
                        <input
                            type="password"
                           
                        // value={formData.fullName}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="login-signup-input">
                        <span>New password</span>
                        <input
                            type="password"
                            
                        // value={formData.email}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="login-signup-input">
                        <span>Confirm new password</span>
                        <input
                            type="password"
                           
                        // value={formData.phoneNumber}
                        // onChange={handleChange}
                        />
                    </div>
                   
                </div>

                <div className="setting-save-btn">
                    <button
                    // onClick={handleSave}
                    >Save</button>
                </div>
            </>}

        </div>


    )

}

export default EditDetails