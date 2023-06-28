import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import bot from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Register() {
  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters'),
    confirmpassword: yup
      .string()
      .required('Confirm Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3555/auth/register', {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
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
    reset();
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={bot} alt="bot" />
        <div className="name">
          <div className="name_box">
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('firstname', { required: true })}
              placeholder="firstname"
            />
            <span>{errors.firstname?.message}</span>
          </div>
          <div className="name_box">
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('lastname', { required: true })}
              placeholder="lastname"
            />
            <span>{errors.lastname?.message}</span>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          </div>
        </div>

        <input {...register('email', { required: true })} placeholder="email" />
        <span>{errors.email?.message}</span>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
          placeholder="password"
          type="password"
        />
        <span>{errors.password?.message}</span>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('confirmpassword', { required: true })}
          placeholder="confirm password"
          type="password"
        />
        <span>{errors.confirmpassword?.message}</span>
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default Register;
