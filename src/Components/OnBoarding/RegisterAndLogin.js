import React, { useState } from 'react';

function RegisterAndLogin({ type }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phonenumber: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'register') {
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
                {type === 'register' && (
                    <div>
                        <span>Name</span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {type === 'register' && (
                    <div>
                        <span>Phone number</span>
                        <input
                            type='tel'
                            name='phonenumber'
                            value={formData.phonenumber}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div>
                    <span>Email</span>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <span>Password</span>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {type === 'register' && (
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


                {type === 'register' && (
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
                    <button type='submit'>{type === 'register' ? 'Signup' : 'Login'}</button>
                </div>

                <div>
                    {type === 'register' ? (
                        <span>
                            Already registered? Please <a href='/login'>Login</a>
                        </span>
                    ) : (
                        <span>
                            Don't have an account? <a href='/signup'>Signup</a>
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}

export default RegisterAndLogin;
