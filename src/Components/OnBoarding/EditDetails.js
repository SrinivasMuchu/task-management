import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { BASE_URL } from '../../Constants';

function EditDetails({ type }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: '',
    });
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

        <div className='edit-page'>
            <div className='edit-page-cont'>
                <div className='edit-page-cont-title'>
                    Edit profile details
                </div>
                <div className='edit-image-div'>
                    <img src='https://thumbs.dreamstime.com/b/gold-diagonal-lines-pattern-3234563.jpg' alt='' />
                </div>
                <div className='edit-page-cont-form'>
                    <form onSubmit={handleSubmit}>
                        {type === 'edit' && <div className='edit-form-inputs'>
                            <span>Name</span>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>}


                        {type === 'edit' && <div className='edit-form-inputs'>
                            <span>Phone number</span>
                            <input
                                type='tel'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>}


                        {type === 'edit' && <div className='edit-form-inputs'>
                            <span>Email</span>
                            <input
                                type='email'
                                name='email'
                                disabled
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>}


                        {type === 'pass' && <div className='edit-form-inputs'>
                            <span>Old password</span>
                            <input
                                type='password'
                                name='oldPassword'
                                value={formData.oldPassword}
                                onChange={handleChange}
                            />
                        </div>}

                        {type === 'pass' && <div className='edit-form-inputs'>
                            <span>Password</span>
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>}

                        {type === 'pass' && (
                            <div className='edit-form-inputs'>
                                <span>Confirm password</span>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        )}


                        {type === 'edit' && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '100px' }}>Gender </span>
                                <div >
                                    <label>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value='Male'
                                            checked={formData.gender === 'Male'}
                                            onChange={handleChange}
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value='Female'
                                            checked={formData.gender === 'Female'}
                                            onChange={handleChange}
                                        />
                                        Female
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value='Other'
                                            checked={formData.gender === 'Other'}
                                            onChange={handleChange}
                                        />
                                        Other
                                    </label>
                                </div>
                            </div>
                        )}





                    </form>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <button onClick={handleSubmit}>{type === 'edit' ? 'Update' : 'update password'}</button>
                    {type === 'edit' ? <button onClick={() => nav('/change-password')}>Change password</button> :
                        <button onClick={() => nav('/edit-details')}>Edit details</button>}

                </div>
            </div>

        </div>


    )

}

export default EditDetails