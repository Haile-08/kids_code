import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLogin } from '../../state/authSlice';
import './style.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post('https://api.kidscode.com/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then(function (res) {
        return res;
      })
      .then(function (resData) {
        // console.log({
        //   user: resData.data?.user,
        //   token: resData.data?.token,
        // });
        dispatch(
          setLogin({
            user: resData.data.user,
            token: resData.data.token,
          })
        );
        navigate('/');
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
