import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from '../../Constants';
import Cookies from "js-cookie";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchMemberDetails = async () => {
    try {
      const headers = {
        "x-auth-token": Cookies.get('user_token'),
      };
      const response = await axios.post(BASE_URL + "/member/edit-details", { action: 'get_info' }, { headers });
      const { data } = response;
      
      // Update form data with the fetched details
      setFormData({
        ...formData,
        name: data.name || '',
        email: data.email || '',
        phoneNumber: data.phone || '',
        gender: data.gender || '',
      });
    } catch (error) {
      console.log('Error fetching member details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "x-auth-token": Cookies.get('user_token'),
      };

      if (type === 'edit') {
        const profileData = {
          name: formData.name,
          phone: formData.phoneNumber,
          gender: formData.gender,
          action: 'update',
        };
        const editDetails = await axios.post(BASE_URL + "/member/edit-details", profileData, { headers });
        console.log('Member details updated:', editDetails);
      } else if (type === 'password') {
        const passwordData = {
          oldPassword: formData.oldPassword,
          newPassword: formData.password,
          confirmNewPassword: formData.confirmPassword,
        };
        const editPassword = await axios.post(BASE_URL + "/member/change-password", passwordData, { headers });
        console.log('Password updated:', editPassword);
      }
    } catch (error) {
      console.log('Error updating details:', error);
    }
  };

  // Fetch member details when component mounts
  useEffect(() => {
    if (type === 'edit') {
      fetchMemberDetails();
    }
  }, [type]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type === 'edit' && (
          <>
            <div>
              <span>Name</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <span>Phone number</span>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div>
              <span>Email</span>
              <input type="email" name="email" value={formData.email} disabled />
            </div>
            <div>
              <span>Gender</span>
              <div>
                <label>
                  <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                  Male
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                  Female
                </label>
                <label>
                  <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />
                  Other
                </label>
              </div>
            </div>
          </>
        )}

        {type === 'password' && (
          <>
            <div>
              <span>Old password</span>
              <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
            </div>
            <div>
              <span>Password</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <span>Confirm password</span>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          </>
        )}

        <div>
          <button type="submit">{type === 'edit' ? 'Update' : 'Update Password'}</button>
        </div>
      </form>
    </div>
  );
}

export default EditDetails;
