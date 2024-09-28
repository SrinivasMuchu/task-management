import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../Constants';
import Cookies from "js-cookie";
import axios from 'axios'

function EditDetails({ type }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        phonenumber: '',
        gender: '',
    });
    const [actionType ,setActionType] =useState('get_info')
    useEffect(() => {
        if(actionType === 'get_info'){
            fetchMemberDetails()
        }
        
    },[actionType])
    const fetchMemberDetails = async() => {
        try {
            try {
               
                const headers = {
                    "x-auth-token": Cookies.get("user_token"),
                };
                const response = await axios.post(
                    BASE_URL + "/member/edit-details",{action:actionType},
                    { headers: headers }
                );
                const required = response.data.data.details;
                setFormData({
                    name: required.full_name || '',
                    email: required.email || '',
                    phonenumber: required.phone_number || '',
                    gender: required.gender || '',
                    oldPassword: '',
                    password: '',
                    confirmPassword: '',
                  });
                console.log(required)
               
            } catch (error) {
                console.error("Error fetching options data:", error);
            }
        } catch (error) {

        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'edit') {
            // Handle registration logic
            console.log('Registering:', formData);
        } else {
            // Handle login logic
            console.log('Logging in:', formData);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {type === 'edit' && <div>
                    <span>Name</span>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>}


                {type === 'edit' && <div>
                    <span>Phone number</span>
                    <input
                        type='tel'
                        name='phonenumber'
                        value={formData.phonenumber}
                        onChange={handleChange}
                    />
                </div>}


                {type === 'edit' && <div>
                    <span>Email</span>
                    <input
                        type='email'
                        name='email'
                        disabled
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>}


                {type === 'pass' && <div>
                    <span>Old password</span>
                    <input
                        type='password'
                        name='oldPassword'
                        value={formData.oldPassword}
                        onChange={handleChange}
                    />
                </div>}

                {type === 'pass' && <div>
                    <span>Password</span>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>}

                {type === 'pass' && (
                    <div>
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
                    <div>
                        <span>Gender</span>
                        <div>
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


                <div>
                    <button type='submit'>{type === 'edit' ? 'Update' : 'update password'}</button>
                </div>


            </form>
        </div>
    )
}

export default EditDetails