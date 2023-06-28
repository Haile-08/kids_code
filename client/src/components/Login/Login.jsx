import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLogin } from '../../state/authSlice';
import bot from '../../assets/logo.png';
import './style.css';

function Login() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });
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
      .post('http://localhost:3555/auth/login', {
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
            user: resData?.data.user,
            token: resData?.data.token,
          })
        );
        navigate('/main');
      })
      .catch(function (err) {
        console.log(err);
      });
    reset();
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={bot} alt="bot" />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input placeholder="Email" {...register('email', { required: true })} />
        <span>{errors.email?.message}</span>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input
          placeholder="Password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
          type="password"
        />
        <span>{errors.password?.message}</span>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
