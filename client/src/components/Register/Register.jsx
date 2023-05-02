import React from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post('https://api.kidscode.com/auth/register', {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.lastname,
        password: data.password,
      })
      .then(function (res) {
        return res;
      })
      .then(function (resData) {
        console.log(resData);
        navigate('/login');
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>FistName</label>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...register('firstname', { required: true })} />
        {errors.email && <span>This field is required</span>}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>LastName</label>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...register('lastname', { required: true })} />
        {errors.password && <span>This field is required</span>}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Email</label>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...register('email', { required: true })} />
        {errors.password && <span>This field is required</span>}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Password</label>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default Register;
